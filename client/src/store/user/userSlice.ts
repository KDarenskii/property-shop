import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Roles } from "../../constants/Roles";
import { IUser } from "../../models/user";

type TInitialState = {
    user: IUser,
    isAuth: boolean;
}

const initialState: TInitialState = {
    user: {
        email: null,
        id: null,
        roles: [Roles.User, Roles.Admin]
    },
    isAuth: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.isAuth = true;
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        logoutUser(state) {
            state.user = {} as IUser;
            state.isAuth = false;
        }
    }
})

export const { setUser, setIsAuth, logoutUser } = userSlice.actions;
export default userSlice.reducer;