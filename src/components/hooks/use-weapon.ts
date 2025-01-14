import type { InferEntrySchema } from "astro:content";
import { useEffect, useReducer } from "react";

const LOCAL_STORAGE_PREFIX = "weapon-v1";
const GLUE = "::";

const buildKey = (key: string) => `${LOCAL_STORAGE_PREFIX}${GLUE}${key}`;

type Weapon = InferEntrySchema<"weapons">;

enum ChallengeType {
  special = "Special",
  military = "Military",
  mastery = "Mastery",
}

type State = {
  challenges: {
    challenge: string;
    completed: boolean;
    type: ChallengeType;
    camoName: string;
  }[];
};

type Actions =
  | {
      type: "complete";
      challenge: string;
    }
  | {
      type: "reset";
      challenge: string;
    }
  | {
      type: "resetAll";
    };

const weaponReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "complete":
      return {
        challenges: state.challenges.map((challenge) =>
          challenge.challenge === action.challenge
            ? { ...challenge, completed: true }
            : challenge
        ),
      };
    case "reset":
      return {
        challenges: state.challenges.map((challenge) =>
          challenge.challenge === action.challenge
            ? { ...challenge, completed: false }
            : challenge
        ),
      };
    case "resetAll":
      return {
        challenges: state.challenges.map((challenge) => ({
          ...challenge,
          completed: false,
        })),
      };
  }
};

const masteryChallenges = [
  {
    camoName: "Mystic gold",
    challenge: "Get 30 special kills",
  },
];

const getInitialState = (weapon: Weapon): State => {
  const storedState = window.localStorage.getItem(buildKey(weapon.name));
  if (storedState) {
    return JSON.parse(storedState);
  }

  return {
    challenges: [
      {
        challenge: "Get 2000 critical kills",
        completed: false,
        camoName: "Purple tiger",
        type: ChallengeType.military,
      },
      ...weapon.challenges.map((challenge) => ({
        ...challenge,
        type: ChallengeType.special,
        completed: false,
      })),
      ...masteryChallenges.map((challenge) => ({
        ...challenge,
        type: ChallengeType.mastery,
        completed: false,
      })),
    ],
  };
};

export const useWeapon = (weapon: Weapon) => {
  const [state, dispatch] = useReducer(weaponReducer, getInitialState(weapon));

  useEffect(() => {
    window.localStorage.setItem(buildKey(weapon.name), JSON.stringify(state));
  }, [state]);

  return { state, dispatch };
};
