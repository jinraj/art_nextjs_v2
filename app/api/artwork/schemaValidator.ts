import { z } from 'zod';
import { artTypes } from '@/app/data/app';

export const createArtworkSchema = z.object({
  artType: z.enum(artTypes),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(10, "Price must be at least 10"),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
  medium: z.string().min(1, "Medium is required"),
  dimension: z.string().max(100, "Dimension must be under 100 characters"),
  artistName: z.string().optional(),
  isHidden: z.boolean().optional(),
  isSold: z.boolean().optional(),
  likes: z.number().optional(),
});

export const updateArtworkSchema = createArtworkSchema.partial().extend({
  id: z.string().min(1, "Id is required"),
});
