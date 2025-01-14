import type { InferEntrySchema } from "astro:content";
import { useWeapon } from "./hooks/use-weapon";

type Props = {
  weapon: InferEntrySchema<"weapons">;
};

export const Progression = ({ weapon }: Props) => {
  const w = useWeapon(weapon);

  if (!w.state.hasBeenVisited) {
    return <p className="text-neutral-500">tbd</p>;
  }

  const nextStep = w.state.challenges.find(
    (challenge) => challenge.completed === false
  );

  return (
    <p className="text-neutral-500">
      next camo <span className="text-white">{nextStep?.camoName}</span>
    </p>
  );
};
