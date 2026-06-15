import { defineCollection, z } from "astro:content";

const dailyMenuCollection = defineCollection({
  type: "content",
  schema: z.object({
    date: z.date(),
    soup: z.string(),
    mainDishes: z.array(
      z.object({
        name: z.string(),
        price: z.number(),
        allergens: z.string().optional(),
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
  "daily-menu": dailyMenuCollection,
  menu: menuCollection,
};