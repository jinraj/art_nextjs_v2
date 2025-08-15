
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma/client";
import { authenticateRequest } from '@/app/auth/auth';

// Basic in-memory rate limiter
const ipLikeMap = new Map<string, Set<string>>();
const requestLog: Map<string, number[]> = new Map();

const RATE_LIMIT = 5;
const WINDOW_MS = 10_000; // 10 seconds

export async function PUT(request: NextRequest, context: any) {
  try {
    const { id } = context.params;
    if (!id || typeof id !== 'string' || id.length === 0) {
      console.warn(`Invalid artwork ID received: ${id}`);
      return NextResponse.json({ message: 'Invalid artwork ID' }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("host") || 'anonymous';

    const ipKey = `${ip}-${id}`;
    const now = Date.now();
    const timestamps = requestLog.get(ipKey) || [];

    const recent = timestamps.filter(ts => now - ts < WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    recent.push(now);
    requestLog.set(ipKey, recent);

    const existing = await prisma.artWork.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
    }

    const likedArtworks = ipLikeMap.get(ip) || new Set<string>();
    const likeAction = likedArtworks.has(id) ? { decrement: 1 } : { increment: 1 };

    const updated = await prisma.artWork.update({
      where: { id },
      data: { likes: likeAction },
      select: { likes: true },
    });

    if (likedArtworks.has(id)) {
      likedArtworks.delete(id);
    } else {
      likedArtworks.add(id);
    }

    ipLikeMap.set(ip, likedArtworks);
    return NextResponse.json({ likes: updated.likes }, { status: 200 });

  } catch (err) {
    console.error('Failed to increment likes', err);
    return NextResponse.json({ error: 'Failed to like artwork' }, { status: 500 });
  }
}
