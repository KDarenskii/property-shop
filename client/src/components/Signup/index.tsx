import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../constants/routesPathNames";
import Alert from "../Alert";
import { ALERT } from "../../constants/alertTypes";
import { showNotion } from "../../utils/showNotion";
import { NOTION } from "../../constants/notion";
import TextInput from "../FormElements/TextInput";
import OrderButton from "../Buttons/OrderButton";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../store/user/thunks/registerUser";
import { ROLES } from "../../constants/roles";
import { setUser } from "../../store/user/userSlice";
import { fetchFavourites } from "../../store/favourites/thunks/fetchFavourites";

import "./styles.scss";

const Signup: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleRegistration = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setError(null);
        setIsSubmiting(true);

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            setIsSubmiting(false);
            return;
        }
        if (password.length < 4) {
            setError("Слабый пароль");
            setIsSubmiting(false);
            return;
        }
        if (!email || !password) {
            setIsSubmiting(false);
            return;
        }

        try {
            const response = await dispatch(
                registerUser({ email, password, roles: [ROLES.USER] })
            ).unwrap();
            dispatch(setUser(response.user));
            localStorage.setItem("token", response.accessToken);
            dispatch(fetchFavourites());
            showNotion(NOTION.SUCCESS, "Аккаунт успешно создан");
            navigate(HOME_ROUTE);
        } catch (error) {
            const err = error as any;
            setError(err.message);
        } finally {
            setIsSubmiting(false);
        }
    };

    return (
        <div className="signup">
            <h3 className="signup__title">Регистрация</h3>
            {error && <Alert type={ALERT.ERROR} message={error} />}
            <form
                className="signup__form"
                onSubmit={handleRegistration}
                onChange={() => setError(null)}
            >
                <TextInput
                    type="email"
                    placeholder="Email"
                    className="signup__input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={isSubmiting}
                />
                <TextInput
                    type="password"
                    placeholder="Пароль"
                    className="signup__input"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isSubmiting}
                />
                <TextInput
                    type="password"
                    placeholder="Подтвердите пароль"
                    className="signup__input"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    disabled={isSubmiting}
                />
                <OrderButton
                    className={"signup__btn"}
                    type={"submit"}
                    text={"Регистрация"}
                    disabled={isSubmiting}
                    size={"small"}
                />
            </form>
            <p className="signup__text">
                Уже есть аккаунт?{" "}
                <Link to={LOGIN_ROUTE} className="signup__link">
                    Войти
                </Link>
            </p>
        </div>
    );
};

export default Signup;
