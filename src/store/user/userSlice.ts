import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";

type TInitialState = {
    user: IUser
}

const initialState: TInitialState = {
    user: {
        email: null,
        uid: null,
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;