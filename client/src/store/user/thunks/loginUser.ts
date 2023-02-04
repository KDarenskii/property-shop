import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { api } from "../../../api";
import { IUser } from "../../../models/user";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";

type LoginUserParams = {
    email: string;
    password: string;
}

type LoginUserResponse = {
    accessToken: string;
    user: IUser;
}

const apiErrors: Record<string, string> = {
    'Incorrect password': 'Неверный пароль',
    'Cannot find user': 'Учетная запись не найдена',
}

export const loginUser = createAppAsyncThunk<LoginUserResponse, LoginUserParams>(
    'user/loginUser',
    async function({ email, password }, { rejectWithValue }) {
        try {
            const response = await api.post('login', { email, password });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    return rejectWithValue({ message:  apiErrors[error.response.data] });
                }
            }
            return rejectWithValue({ message: ERROR_MESSAGES.TECHNICAL_ISSUE });
        }
    }
)