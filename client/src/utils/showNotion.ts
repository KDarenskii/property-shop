import { toast, Id, ToastOptions } from "react-toastify";
import { NOTION } from "../constants/notion";

const alertOptions: ToastOptions = {
    autoClose: 800,
    position: toast.POSITION.TOP_RIGHT,
};

export const showNotion = (type: NOTION, message: string): Id | undefined => {
    switch (type) {
        case NOTION.SUCCESS:
            return toast.success(message, alertOptions);
        case NOTION.ERROR:
            return toast.error(message, alertOptions);
        default:
            return;
    }
};
