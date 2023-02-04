import axios from "axios";
import { ERROR_MESSAGES } from "../constants/errorMessages";

type AuthErrorReturn = {
    message: string;
    isAuthError?: boolean;
}

export const handleAuthError = (error: any): AuthErrorReturn => {
    if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
            return ({ isAuthError: true, message: ERROR_MESSAGES.AUTH });
        } else if (error.response) {
            return ({ message: ERROR_MESSAGES.SERVER_ISSUE });
        } else {
            return ({ message: ERROR_MESSAGES.NETWORK_ISSUE });
        }
    }
    return ({ message: ERROR_MESSAGES.TECHNICAL_ISSUE });
}