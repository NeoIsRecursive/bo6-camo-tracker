import type { InferEntrySchema } from "astro:content";

export type Weapon = InferEntrySchema<"weapons">;

export enum ChallengeType {
  special = "Special",
  military = "Military",
  mastery = "Mastery",
}
