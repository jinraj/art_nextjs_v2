import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/client';
import { ArtType } from '@prisma/client'; // runtime enum object

// derive valid artType strings from Prisma enum object (no hardcoding)
const VALID_ART_TYPES = Object.values(ArtType) as unknown as ArtType[];

const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

declare global {
  // eslint-disable-next-line no-var
  var ARTWORKS_CACHE:
    | {
        [key: string]: { ts: number; data: any[] } | undefined;
      }
    | undefined;
}
if (!global.ARTWORKS_CACHE) global.ARTWORKS_CACHE = {};

/**
 * GET /api/artworks/[artType]
 * Example: /api/artworks/Paintings
 */
export async function GET(request: NextRequest, context: any) {
  try {
    console.log("Fetching artworks...");
    const params = await context.params;
    const artTypeParam = params?.artType ?? request.nextUrl.searchParams.get('artType') ?? '';
    const artTypeStr = String(artTypeParam).trim();

    if (!artTypeStr) {
      return NextResponse.json({ error: 'Missing artType parameter' }, { status: 400 });
    }

    // Validate against Prisma enum values (derived at runtime)
    if (!VALID_ART_TYPES.includes(artTypeStr as ArtType)) {
      return NextResponse.json(
        { error: `Invalid artType '${artTypeStr}'. Valid: ${VALID_ART_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Safe cast to Prisma enum type (we validated above)
    const prismaArtType = artTypeStr as ArtType;
    const cacheKey = `artworks:${prismaArtType}`;
    const now = Date.now();
    const cached = global.ARTWORKS_CACHE![cacheKey];

    // Serve from local cache if fresh
    // if (cached && now - cached.ts < TTL_MS) {
    //   console.log("fetching artworks from cache")
    //   return NextResponse.json(
    //     { artworks: cached.data, source: 'cache' },
    //     {
    //       status: 200,
    //       headers: {
    //         'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
    //       },
    //     }
    //   );
    // }
    
    console.log("fetching artworks from db - ", prismaArtType);
    // Fetch from DB: filter by artType and isHidden:false, sorted newest first.
    const artworks = await prisma.artwork.findMany({
      where: {
        artType: prismaArtType,
        isHidden: false,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        images: true,
        medium: true,
        dimensions: true,
        price: true,
        artistId: true,
        likes: true,
        isSold: true,
        createdAt: true,
        updatedAt: true,
        artist: { select: { id: true, name: true } },
      },
    });

    console.log("artworks", artworks.length);

    // write to local cache
    global.ARTWORKS_CACHE![cacheKey] = { ts: now, data: artworks };

    return NextResponse.json(
      { artworks, source: 'origin' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err) {
    console.error('Error in artworks route', err);
    return NextResponse.json({ error: 'Failed to fetch artworks' }, { status: 500 });
  }
}
