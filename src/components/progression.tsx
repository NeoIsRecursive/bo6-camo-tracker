import type { InferEntrySchema } from "astro:content";
import { useWeapon } from "./hooks/use-weapon";

type Props = {
  weapon: InferEntrySchema<"weapons">;
};

export const Progression = ({ weapon }: Props) => {
  const w = useWeapon(weapon);
  const nextCamo = w.state.hasBeenVisited
    ? w.state.challenges.find((challenge) => challenge.completed === false)
        ?.camoName
    : null;

  return (
    <p className="text-neutral-500">
      next: <span className="text-white">{nextCamo ?? "tbd"}</span>
    </p>
  );
};
