import { z } from "zod";

export const addMemberSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  age: z.number().min(18, "Age must be at least 18 years old"),
  subscriptions: z
    .array(
      z.object({
        id: z.number(),
      })
    )
    .optional(),
});

export type AddMemberSchema = z.infer<typeof addMemberSchema>;
