import { ChallengeType, type Weapon } from "../types";
import type { State } from "./weapon-state-reducer";

const MASTERY_CHALLENGES = [
  {
    camoName: "Mystic gold",
    challenge: "Get 10 kills rapidly 15 times",
  },
  {
    camoName: "Opal",
    challenge: "Get 30 special eliminations",
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

const LOCAL_STORAGE_PREFIX = "weapon-v1";
const GLUE = "::";

const buildKey = (key: string) => `${LOCAL_STORAGE_PREFIX}${GLUE}${key}`;

const buildNonSpecialChallenge = (challenge: {
  camoName: string;
  completed?: boolean;
}) => {
  const masteryChallenge = MASTERY_CHALLENGES.find(
    (x) => x.camoName === challenge.camoName
  );

  if (masteryChallenge) {
    return {
      ...masteryChallenge,
      completed: challenge.completed ?? false,
      type: ChallengeType.mastery,
    };
  }

  return {
    ...challenge,
    challenge: "Get 2000 critical kills",
    completed: challenge.completed ?? false,
    type: ChallengeType.military,
  };
};

export const getInitialWeaponState = (weapon: Weapon): State => {
  const storedState = window.localStorage.getItem(buildKey(weapon.name));
  if (storedState) {
    const parsed = JSON.parse(storedState) as State; // TODO: validate the stored state

    parsed.challenges = parsed.challenges.map((challenge) =>
      challenge.type !== ChallengeType.special
        ? buildNonSpecialChallenge(challenge)
        : challenge
    );

    return parsed;
  }

  return {
    hasBeenVisited: false,
    challenges: [
      buildNonSpecialChallenge({
        camoName: "purple tiger",
      }),
      ...weapon.challenges.map((challenge) => ({
        ...challenge,
        type: ChallengeType.special,
        completed: false,
      })),
      ...MASTERY_CHALLENGES.map(buildNonSpecialChallenge),
    ],
  };
};

export const setWeaponState = (weapon: Weapon, state: State) => {
  window.localStorage.setItem(buildKey(weapon.name), JSON.stringify(state));
};
