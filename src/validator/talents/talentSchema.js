import { z } from "zod";

export const talentSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must not exceed 500 characters" }),
  videoUrl: z.string().url({ message: "Invalid video URL" }),
  thumbnailUrl: z.string().url({ message: "Invalid thumbnail URL" }).optional(),
  userID: z.string(),
  approved: z.boolean().default(false),
  likesCount: z.number().default(0),
  commentsCount: z.number().default(0),
  categories: z
    .array(z.string())
    .min(1, { message: "At least one category is required" })
    .max(3, { message: "Maximum of 3 categories allowed" }),
});

export const talentUpdateSchema = z.object({
  title: z
  .string()
  .min(3, { message: "Title must be at least 3 characters long" })
  .max(100, { message: "Title must not exceed 100 characters" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must not exceed 500 characters" })
    .optional(),
  mediaUrl: z.string().url("Invalid media URL").optional(),
  thumbnailUrl: z.string().url("Invalid thumbnail URL").optional(),
  categories: z
    .array(z.string())
    .max(3, "You can add a maximum of 3 categories")
    .optional(),
});
