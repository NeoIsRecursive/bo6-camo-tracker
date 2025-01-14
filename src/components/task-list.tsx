import { List } from "./list";

type Task = {
  challenge: string;
  camoName: string;
  completed: boolean;
};

type Props = {
  header?: string;
  tasks: Task[];
  complete: (challenge: string) => void;
  reset: (challenge: string) => void;
};

export const TaskList = ({ header, tasks, complete, reset }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white">{header}</h2>
      <List
        items={tasks}
        keySelector={(task) => task.challenge}
        renderItem={(challenge) => (
          <>
            <input
              id={challenge.challenge}
              name={`completed ${challenge.challenge}`}
              type="checkbox"
              checked={challenge.completed}
              onChange={() =>
                challenge.completed
                  ? reset(challenge.challenge)
                  : complete(challenge.challenge)
              }
              className="size-6 min-w-6 rounded"
            />
            <label
              htmlFor={challenge.challenge}
              className="ml-3 w-full grid gap-1"
            >
              <span className="text-md font-light">{challenge.camoName}:</span>
              <span className="text-lg font-medium">{challenge.challenge}</span>
            </label>
          </>
        )}
      />
    </div>
  );
};
