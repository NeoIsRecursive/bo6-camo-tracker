import type { JSX } from "react";

type Props<T> = {
  items: T[];
  keySelector: (item: T) => string;
  renderItem: (item: T) => JSX.Element;
};

export const List = <T extends unknown>({
  items,
  renderItem,
  keySelector,
}: Props<T>) => (
  <ul className="py-4">
    {items.map((item) => (
      <li
        key={keySelector(item)}
        className="inline-flex w-full items-center gap-x-2 py-3 px-4 text-sm font-medium border first:rounded-t-lg last:rounded-b-lg bg-neutral-900 border-neutral-700 text-white"
      >
        {renderItem(item)}
      </li>
    ))}
  </ul>
);
