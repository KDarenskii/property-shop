import axios from "axios";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export const handleDefaultError = (error: any): string => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            return ERROR_MESSAGES.SERVER_ISSUE;
        } else {
            return ERROR_MESSAGES.NETWORK_ISSUE;
        }
    }
    return ERROR_MESSAGES.TECHNICAL_ISSUE;
}