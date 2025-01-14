import type { InferEntrySchema } from "astro:content";
import { useWeapon } from "./hooks/use-weapon";

type Props = {
  weapon: InferEntrySchema<"weapons">;
};

export const Progression = ({ weapon }: Props) => {
  const w = useWeapon(weapon);

  const grouped = Object.groupBy(w.state.challenges, (c) => c.type);

  return (
    <div>
      {Object.entries(grouped).map(([type, challenges]) => (
        <p key={type}>
          {challenges.filter((c) => c.completed).length}/{challenges.length}{" "}
          {type} challenges
        </p>
      ))}
    </div>
  );
};
