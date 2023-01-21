import * as Yup from "yup";
import { phoneRegExp } from "../../../constants/regExp";

export const viewingScheme = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Минимальное количество символов: 2")
        .max(35, "Превышено максимальное количество символов")
        .required("Обязательное поле"),
    lastName: Yup.string()
        .min(2, "Минимальное количество символов: 2")
        .max(35, "Превышено максимальное количество символов")
        .required("Обязательное поле"),
    phone: Yup.string()
        .matches(phoneRegExp, "Не корректный номер телефона")
        .required("Обязательное поле"),
    email: Yup.string()
        .email("Не корректный email")
        .required("Обязательное поле"),
});