import React from "react";
import { Link } from "react-router-dom";
import { ALERT_TYPES } from "../../constants/alertTypes";
import { LOGIN_ROUTE } from "../../constants/routesPathNames";
import Alert from "../Alert";
import { auth } from "../../firebase";
import { AuthError, sendPasswordResetEmail } from "firebase/auth";

import './styles.scss';

const ResetPassword: React.FC = () => {

    const [email, setEmail] = React.useState<string>("");
    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(null);
        setIsSubmiting(true);

        if (!email) {
            setIsSubmiting(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Для восстановления пароля вам было отправлено письмо на указанный Email адрес");
        } catch (error) {
            const err = error as AuthError;
            if (err.code === "auth/user-not-found")
                setError("Учетная запись не найдена");
        }

        setIsSubmiting(false);
    };

    return (
        <div className="reset-password">
            <h3 className="reset-password__title">Сброс пароля</h3>
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            {message ? (
                <Alert type={ALERT_TYPES.SUCCESS} message={message} />
            ) : (
                <form
                    className="reset-password__form"
                    onSubmit={handleLogin}
                    onChange={() => setError(null)}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="reset-password__input input control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={isSubmiting}
                    />
                    <button
                        className="reset-password__btn button-order button-order--small"
                        type="submit"
                        disabled={isSubmiting}
                    >
                        Сбросить
                    </button>
                </form>
            )}
            <p className="reset-password__text">
                <Link to={LOGIN_ROUTE} className="reset-password__link">
                    Войти
                </Link>
            </p>
        </div>
    )
}

export default ResetPassword