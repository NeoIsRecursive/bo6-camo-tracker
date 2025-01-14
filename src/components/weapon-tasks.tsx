import type { InferEntrySchema } from "astro:content";
import { useWeapon } from "./hooks/use-weapon";
import { TaskList } from "./task-list";

type Weapon = InferEntrySchema<"weapons">;

export const WeaponTasks = ({ weapon }: { weapon: Weapon }) => {
  const { state: w, dispatch } = useWeapon(weapon);

  const groupedChallenges = Object.groupBy(w.challenges, ({ type }) => type);
  console.log(groupedChallenges);

  return (
    <div>
      {Object.entries(groupedChallenges).map(([type, challenges]) => (
        <TaskList
          header={type}
          tasks={challenges}
          complete={(c) => dispatch({ challenge: c, type: "complete" })}
          reset={(c) => dispatch({ challenge: c, type: "reset" })}
        />
      ))}
    </div>
  );
};
