import { Artwork, User } from "@prisma/client";

export type ArtworkWithArtist = Artwork & { artist: User };