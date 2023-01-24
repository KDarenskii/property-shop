import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { api } from "../../../api";
import { IUser } from "../../../models/user";

type RegisterParams = {
    email: string;
    password: string;
    roles: number[];
}

type RegisterResponse = {
    accessToken: string;
    user: IUser;
}

export const registerUser = createAppAsyncThunk<RegisterResponse, RegisterParams>(
    'user/signupUser',
    async function ({ email, password, roles }, { rejectWithValue }) {
        try {
            const response = await api.post<RegisterResponse>('register', { email, password, roles });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    return rejectWithValue({ message: 'Пользователь с таким Email уже существует' });
                }
            }
            return rejectWithValue({ message: 'Возникла техническая ошибка' });
        }
    }
)