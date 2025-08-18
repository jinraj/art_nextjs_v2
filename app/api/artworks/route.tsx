import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { createArtworkSchema, updateArtworkSchema } from "./schemaValidator";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { authenticateRequestBySession } from "@/app/auth/auth";
import { ArtType } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching artworks...");

    const artworks = await prisma.artwork.findMany();
    if (!artworks || artworks.length === 0) {
      return NextResponse.json({ message: "No artworks found" }, { status: 404 });
    }
    return NextResponse.json(artworks);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Inserting artwork...");
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const formData = await request.formData();
    const images = formData.getAll('images') as File[];
    const artType = formData.get('artType') as ArtType;
    const savedImagePaths = await saveImages(images, artType);
    const data = {
      artType: artType,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dimensions: formData.get('dimensions') as string,
      medium: formData.get('medium') as string,
      price: parseFloat(formData.get('price') as string),
      artistName: formData.get('artistName') as string,
      isHidden: formData.get('isHidden') === 'on',
      isSold: formData.get('isSold') === 'on',
      images: savedImagePaths
    };

    const validation = createArtworkSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const newArtwork = await prisma.artwork.create({ data });

    return NextResponse.json(newArtwork, { status: 201 });
  } catch (error) {
    console.error("Error creating artwork:", error);
    return NextResponse.json({ error: "Failed to create artwork" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log("Deleting artwork...");
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Artwork ID is required" }, { status: 400 });
    }

    const deletedArtwork = await prisma.artwork.delete({
      where: { id },
    });

    return NextResponse.json(deletedArtwork, { status: 200 });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log("Updating artwork...");
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const body = await request.json();
    const validation = updateArtworkSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { id, artType, ...rest } = validation.data;
    const updatedArtwork = await prisma.artwork.update({
      where: { id },
      data: {
        ...rest,
        ...(artType && { artType: artType as ArtType }) // ✅ Cast only if defined
      }
    });

    return NextResponse.json(updatedArtwork, { status: 200 });
  } catch (error) {
    console.error("Error updating artwork:", error);
    return NextResponse.json({ error: "Failed to update artwork" }, { status: 500 });
  }
}

async function saveImages(images: File[], artType: string) {
  const uploadDir = path.join(process.cwd(), "public", "resources", "artworks");
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }
  const savedImagePaths: string[] = [];

  for (const image of images) {
  if (image.name !== "") {
    console.log(`Saving image: ${image.name}`);
    const fnPrefix = image.name.slice(0, 5).replace(/[^a-z0-9]/gi, '_');
    const fileName = `${artType}-${Date.now()}-${fnPrefix}${path.extname(image.name)}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    console.log("filePath", filePath);
    savedImagePaths.push(`/resources/artworks/${fileName}`);
  }
}
  return savedImagePaths;
}