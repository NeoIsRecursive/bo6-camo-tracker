import type { InferEntrySchema } from "astro:content";
import { useWeapon } from "./hooks/use-weapon";
import { TaskList } from "./task-list";
import { useEffect } from "react";

type Weapon = InferEntrySchema<"weapons">;

export const WeaponTasks = ({ weapon }: { weapon: Weapon }) => {
  const { state: w, dispatch } = useWeapon(weapon);

  useEffect(() => {
    dispatch({ type: "markAsVisited" });
  }, []);

  const groupedChallenges = Object.groupBy(w.challenges, ({ type }) => type);

  return (
    <div>
      {Object.entries(groupedChallenges).map(([type, challenges]) => (
        <TaskList
          key={type}
          header={type}
          tasks={challenges}
          complete={(c) => dispatch({ challenge: c, type: "complete" })}
          reset={(c) => dispatch({ challenge: c, type: "reset" })}
        />
      ))}
    </div>
  );
};
