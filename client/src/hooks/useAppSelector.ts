import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RooteState } from "../store";

export const useAppSelector: TypedUseSelectorHook<RooteState> = useSelector;
