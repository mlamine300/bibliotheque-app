import { z } from "zod";
export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  // id: z.string().nonempty(),
  title: z.string().min(3).max(100).nonempty(),
  author: z.string().min(3).max(100).nonempty(),
  genre: z.string().min(3).max(300).nonempty(),
  total_copies: z.coerce.number().positive(),
  // available_copies: z.coerce.number().positive().optional(),
  cover: z.string().nonempty(),
  color: z.string().nonempty(),
  video: z.string().nonempty(),
  rating: z.coerce.number().lte(5),
  description: z.string().min(10).max(1000),
  summary: z.string().min(10),
});
