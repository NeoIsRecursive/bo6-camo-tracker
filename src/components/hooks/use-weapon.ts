import { useEffect, useReducer } from "react";
import type { Weapon } from "../../types";
import {
  persistMiddleware,
  weaponReducer,
} from "../../utils/weapon-state-reducer";
import { getInitialWeaponState } from "../../utils/weapons";

export const useWeapon = (weapon: Weapon) => {
  const [state, dispatch] = useReducer(
    persistMiddleware(weaponReducer, weapon),
    getInitialWeaponState(weapon)
  );

  useEffect(() => {
    const handler = () => {
      dispatch({ type: "load", state: getInitialWeaponState(weapon) });
    };

    window.addEventListener("pageshow", handler);

    return () => {
      window.removeEventListener("pageshow", handler);
    };
  }, [weapon, dispatch]);

  return { state, dispatch };
};
