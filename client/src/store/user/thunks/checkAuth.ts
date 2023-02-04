import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { fetchFavourites } from "../../favourites/thunks/fetchFavourites";
import { logoutUser, setIsAuth } from "../userSlice";
import { refreshUser } from "./refreshUser";

export const checkAuth = createAppAsyncThunk(
    'user/checkAuth',
    async function(_, { dispatch }) {

        const token = localStorage.getItem("token");
        
        if (token) {
            
            try {
                await dispatch(refreshUser()).unwrap();
                dispatch(setIsAuth(true));
                await dispatch(fetchFavourites());
            } catch (error) {
                dispatch(logoutUser());
            }

        } else logoutUser();
    }
)