import z from "zod";

// schema
export const addSportSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  coach: z.string().min(3, "Coach must be at least 3 characters long"),
});

export type AddSportSchema = z.infer<typeof addSportSchema>;
