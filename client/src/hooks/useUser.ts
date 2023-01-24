import { useAppSelector } from "./useAppSelector";
import { selectUser } from "../store/user/selectors";
import { IUser } from "../models/user";

type UserReturn = {
    user: IUser;
    isAuth: boolean;
}

export const useUser = (): UserReturn => {
    const { user, isAuth } = useAppSelector(selectUser);
    return ({ user, isAuth });
}