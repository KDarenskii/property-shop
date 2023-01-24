import { RooteState } from "..";

export const selectUser = (state: RooteState) => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
});
