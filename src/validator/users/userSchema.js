import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .min(2, "First Name must be atleast 2 Characters")
    .max(20, "Fist Name characters must be less than 20"),
  lastName: z
    .string()
    .min(2, "Last Name must be atleast 2 Characters")
    .max(20, "Last Name characters must be less than 20"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters").max(16, "Password cannot exceed 16 character"),
  role: z.enum(["admin", "sponsor", "talent"]),
});


export const updateUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email format").optional(),
  profilePicture: z.string().url("Invalid profile picture URL").optional(),
  role: z.string().optional()
});
