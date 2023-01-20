import { RooteState } from "../store";

export const selectUser = (state: RooteState) => state.user.user;