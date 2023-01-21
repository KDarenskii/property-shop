import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, RESET_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "../../constants/routesPathNames";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NOTION_TYPES } from "../../constants/notionTypes";
import { showNotion } from "../../utils/showNotion";
import { ALERT_TYPES } from "../../constants/alertTypes";
import Alert from "../Alert";
import TextInput from "../FormElements/TextInput";
import OrderButton from "../Buttons/OrderButton";

import "./styles.scss";

const Login: React.FC = () => {

    const navigate = useNavigate();

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(null);
        setIsSubmiting(true);

        if (!email || !password) {
            setIsSubmiting(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showNotion(NOTION_TYPES.SUCCESS, "Вы вошли в аккаунт");
            navigate(HOME_ROUTE);
        } catch (error) {
            const err = error as AuthError;
            if (err.code === "auth/user-not-found")
                setError("Учетная запись не найдена");
            else if (err.code === "auth/invalid-email")
                setError("Неверный Email");
            else if (err.code === "auth/wrong-password")
                setError("Неверный пароль");
            else if (err.code === "auth/user-disabled")
                setError("Аккаунт недействителен");
        }

        setIsSubmiting(false);
    };

    return (
        <div className="login">
            <h3 className="login__title">Вход</h3>
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            <form
                className="login__form"
                onSubmit={handleLogin}
                onChange={() => setError(null)}
            >
                <TextInput
                    type="email"
                    placeholder="Email"
                    className="login__input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={isSubmiting}
                />
                <TextInput
                    type="password"
                    placeholder="Пароль"
                    className="login__input"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isSubmiting}
                />
                <OrderButton 
                    className={'login__btn'} 
                    type={'submit'} 
                    text={'Войти'} 
                    disabled={isSubmiting} 
                    size={'small'}
                />
            </form>
            <p className="login__text">
                <Link to={RESET_PASSWORD_ROUTE} className="login__link">
                    Забыл пароль
                </Link>
            </p>
            <p className="login__text">
                Ещё нет аккаунта?{" "}
                <Link to={SIGN_UP_ROUTE} className="login__link">
                    Регистрация
                </Link>
            </p>
        </div>
    );
};

export default Login;
