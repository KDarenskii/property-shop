import { useAppSelector } from "./useAppSelector";
import { selectUser } from "../store/user/selectors";
import { IUser } from "../models/user";

export const useUser = (): IUser => {
    const user = useAppSelector(selectUser);
    return ({
        email: user.email,
        uid: user.uid,
        isAuth: Boolean(user.email)
    })
}