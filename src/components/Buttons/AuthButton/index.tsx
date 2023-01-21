import { signOut } from "firebase/auth";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NOTION_TYPES } from "../../../constants/notionTypes";
import {
    LOGIN_ROUTE,
    RESET_PASSWORD_ROUTE,
    SIGN_UP_ROUTE,
} from "../../../constants/routesPathNames";
import { auth } from "../../../firebase";
import { useUser } from "../../../hooks/useUser";
import { showNotion } from "../../../utils/showNotion";

import "./styles.scss";

type AuthButtonProps = {
    className?: string;
};

const AuthButton: React.FC<AuthButtonProps> = ({ className = "" }) => {
    const location = useLocation();
    const isAuthPage =
        location.pathname === LOGIN_ROUTE ||
        location.pathname === SIGN_UP_ROUTE ||
        location.pathname === RESET_PASSWORD_ROUTE;

    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);

    const handleLogout = async () => {
        if (isSubmiting) return;
        setIsSubmiting(true);

        try {
            await signOut(auth);
            showNotion(NOTION_TYPES.SUCCESS, "Вы вышли из аккаунта");
        } catch (error) {
            showNotion(NOTION_TYPES.ERROR, "Не удалось выйти из аккаунта");
        }
        setIsSubmiting(false);
    };

    const user = useUser();

    return (
        <>
            {!isAuthPage && (
                <>
                    {user.isAuth ? (
                        <span
                            onClick={handleLogout}
                            className={`auth-link ${className}`}
                        >
                            <i className="fas fa-sign-out-alt auth-link__icon"></i>{" "}
                            Выйти
                        </span>
                    ) : (
                        <Link to="/login" className={`auth-link ${className}`}>
                            <i className="fas fa-user auth-link__icon"></i> Вход
                        </Link>
                    )}
                </>
            )}
        </>
    );
};

export default AuthButton;
