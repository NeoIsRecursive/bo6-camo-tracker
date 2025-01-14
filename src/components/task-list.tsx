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
      <ul className="py-4">
        {tasks.map((challenge) => (
          <li
            className="inline-flex w-full items-center gap-x-2 py-3 px-4 text-sm font-medium border first:rounded-t-lg last:rounded-b-lg bg-neutral-900 border-neutral-700 text-white"
            key={challenge.challenge}
          >
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
          </li>
        ))}
      </ul>
    </div>
  );
};
