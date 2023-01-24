import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HOME_ROUTE, SIGN_UP_ROUTE } from "../../constants/routesPathNames";
import { NOTION_TYPES } from "../../constants/notionTypes";
import { showNotion } from "../../utils/showNotion";
import { ALERT_TYPES } from "../../constants/alertTypes";
import Alert from "../Alert";
import TextInput from "../FormElements/TextInput";
import OrderButton from "../Buttons/OrderButton";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginUser } from "../../store/user/thunks/loginUser";
import { setUser } from "../../store/user/userSlice";
import { fetchFavourites } from "../../store/favourites/thunks/fetchFavourites";

import "./styles.scss";

const Login: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from: string = location.state?.from?.pathname || HOME_ROUTE;

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
        if (password.length < 4) {
            setError('Слишком короткий пароль');
            setIsSubmiting(false);
            return;
        }

        try {
            const response = await dispatch(loginUser({ email, password })).unwrap();
            dispatch(setUser(response.user));
            localStorage.setItem('token', response.accessToken);
            dispatch(fetchFavourites());
            showNotion(NOTION_TYPES.SUCCESS, "Вы вошли в аккаунт");
            navigate(from, { replace: true });
        } catch (error) {
            const err = error as any;
            setError(err.message);
        } finally {
            setIsSubmiting(false);
        }
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
                Ещё нет аккаунта?{" "}
                <Link to={SIGN_UP_ROUTE} className="login__link">
                    Регистрация
                </Link>
            </p>
        </div>
    );
};

export default Login;
