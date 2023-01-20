import { toast, Id, ToastOptions } from "react-toastify";
import { NOTION_TYPES, TNotion } from "../constants/notionTypes";

const alertOptions: ToastOptions = {
    autoClose: 800,
    position: toast.POSITION.TOP_RIGHT
}

export const showNotion = (type: TNotion, message: string): (Id | undefined) => {
    switch (type) {
        case NOTION_TYPES.SUCCESS:
            return toast.success(message, alertOptions);
        case NOTION_TYPES.ERROR:
            return toast.error(message, alertOptions);
        default:
            return;
    }
}