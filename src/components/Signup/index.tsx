import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../constants/routesPathNames";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthError } from "firebase/auth";
import Alert from "../Alert";
import { ALERT_TYPES } from "../../constants/alertTypes";
import { showNotion } from "../../utils/showNotion";
import { NOTION_TYPES } from "../../constants/notionTypes";
import TextInput from "../FormElements/TextInput";
import OrderButton from "../Buttons/OrderButton";

import "./styles.scss";

const Signup: React.FC = () => {

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

        if (!email || !password) {
            setIsSubmiting(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            showNotion(NOTION_TYPES.SUCCESS, "Аккаунт успешно создан");
            navigate(HOME_ROUTE);
        } catch (error) {
            const err = error as AuthError;
            console.log(err.code);
            if (err.code === "auth/email-already-in-use")
                setError("Аккаунт с таким Email уже существует");
            else if (err.code === "auth/weak-password")
                setError("Слабый пароль");
        }

        setIsSubmiting(false);
    };

    return (
        <div className="signup">
            <h3 className="signup__title">Регистрация</h3>
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
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
                    className="signup__input input control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isSubmiting}
                />
                <TextInput
                    type="password"
                    placeholder="Подтвердите пароль"
                    className="signup__input input control"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    disabled={isSubmiting}
                />
                <OrderButton 
                    className={'signup__btn'} 
                    type={'submit'} 
                    text={'Регистрация'} 
                    disabled={isSubmiting} 
                    size={'small'}
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
