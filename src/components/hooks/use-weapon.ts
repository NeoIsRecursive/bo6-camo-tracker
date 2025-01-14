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
  hasBeenVisited: boolean;
  challenges: {
    challenge: string;
    completed: boolean;
    type: ChallengeType;
    camoName: string;
  }[];
};

type Actions =
  | {
      type: "load";
      state: State;
    }
  | {
      type: "markAsVisited";
    }
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
    case "load": {
      return action.state;
    }
    case "markAsVisited":
      return {
        ...state,
        hasBeenVisited: true,
      };
    case "complete":
      return {
        ...state,
        challenges: state.challenges.map((challenge) =>
          challenge.challenge === action.challenge
            ? { ...challenge, completed: true }
            : challenge
        ),
      };
    case "reset":
      return {
        ...state,
        challenges: state.challenges.map((challenge) =>
          challenge.challenge === action.challenge
            ? { ...challenge, completed: false }
            : challenge
        ),
      };
    case "resetAll":
      return {
        ...state,
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
  {
    camoName: "Opal",
    challenge: "Get 10 elite kills",
  },
  {
    camoName: "Afterlife",
    challenge: "Get 20 consecutive kills 10 times without taking damage",
  },
  {
    camoName: "Nebula",
    challenge: "Kill 10 elite zombies",
  },
];

const getInitialState = (weapon: Weapon): State => {
  const storedState = window.localStorage.getItem(buildKey(weapon.name));
  if (storedState) {
    return JSON.parse(storedState); // TODO: validate the stored state
  }

  return {
    hasBeenVisited: false,
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
    const handler = () => {
      dispatch({ type: "load", state: getInitialState(weapon) });
    };

    window.addEventListener("pageshow", handler);

    return () => {
      window.removeEventListener("pageshow", handler);
    };
  }, [weapon, dispatch]);

  useEffect(() => {
    window.localStorage.setItem(buildKey(weapon.name), JSON.stringify(state));
  }, [state]);

  return { state, dispatch };
};
