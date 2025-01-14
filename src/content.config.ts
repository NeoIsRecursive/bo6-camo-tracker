import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const weapons = defineCollection({
  loader: file("src/data/weapons.json"),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    challenges: z.array(
      z.object({
        challenge: z.string(),
        camoName: z.string(),
      })
    ),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { weapons };
