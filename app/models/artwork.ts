import { AppReview, Artwork, Order, OrderItem, User } from "@prisma/client";

export type ArtworkWithArtist = Artwork & { artist: User };
export type ReviewWithUser = AppReview & { user: User };
export type OrderWithItems = Order & { items: OrderItem[] };