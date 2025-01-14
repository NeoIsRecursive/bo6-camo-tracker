import type { InferEntrySchema } from "astro:content";
import { useWeapon } from "./hooks/use-weapon";

type Props = {
  weapon: InferEntrySchema<"weapons">;
};

export const Progression = ({ weapon }: Props) => {
  const w = useWeapon(weapon);

  if (!w.state.hasBeenVisited) {
    return <p>tbd</p>;
  }

  const nextStep = w.state.challenges.find(
    (challenge) => challenge.completed === false
  );

  return <p>next camo {nextStep?.camoName}</p>;
};
