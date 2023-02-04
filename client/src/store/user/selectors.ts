import { RootState } from "..";

export const selectUser = (state: RootState) => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
});
