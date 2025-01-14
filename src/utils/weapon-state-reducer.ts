import type { ChallengeType, Weapon } from "../types";
import { setWeaponState } from "./weapons";

export type State = {
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

export const weaponReducer = (state: State, action: Actions): State => {
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

export const persistMiddleware =
  (reducer: typeof weaponReducer, weapon: Weapon) =>
  (state: State, action: Actions) => {
    const newState = reducer(state, action);
    setWeaponState(weapon, newState);
    return newState;
  };
