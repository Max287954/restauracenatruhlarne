import { defineCollection, z } from "astro:content";

const weeklyMenuCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    days: z.array(
      z.object({
        day_name: z.string(),
        soup: z
          .object({
            name: z.string(),
            price: z.number(),
          })
          .optional(),
        mains: z
          .array(
            z.object({
              name: z.string(),
              price: z.number(),
              allergens: z.string().optional(),
            }),
          )
          .optional()
          .default([]),
      }),
    ),
  }),
});

const menuCollection = defineCollection({
  type: "content",
  schema: z.object({
    category: z.enum(["polevky", "hlavni-jidla", "dezerty", "napoje"]),
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    allergens: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  "weekly-menu": weeklyMenuCollection,
  menu: menuCollection,
};
