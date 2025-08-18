import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { authenticateRequestBySession } from "@/app/auth/auth";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        console.log("Fetching artworks by role...");
        const session = await authenticateRequestBySession();
        if (session instanceof NextResponse) return session;

        let artworks;

         if (session.user.role === Role.Admin) {
            // ✅ Admin gets all artworks
            artworks = await prisma.artwork.findMany({
                include: {
                    artist: {
                        select: { id: true, name: true },
                    },
                },
            });
        } else if (session.user.role === Role.Artist) {
            // ✅ Artist gets only their artworks
            artworks = await prisma.artwork.findMany({
                where: { artistId: session.user.id },
                include: {
                    artist: {
                        select: { id: true, name: true },
                    },
                },
            });
        } else {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        if (!artworks || artworks.length === 0) {
            return NextResponse.json({ message: "No artworks found" }, { status: 404 });
        }

        return NextResponse.json(artworks);
    } catch (error) {
        console.error("Error fetching artworks:", error);
        return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 });
    }
}
