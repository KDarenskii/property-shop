import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NOTION } from "../../../constants/notion";
import { LOGIN_ROUTE, SIGN_UP_ROUTE } from "../../../constants/routesPathNames";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useUser } from "../../../hooks/useUser";
import { logoutUser } from "../../../store/user/userSlice";
import { showNotion } from "../../../utils/showNotion";
import cn from "classnames";

import "./styles.scss";

type AuthButtonProps = {
    className?: string;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthButton: React.FC<AuthButtonProps> = ({ setIsActive, className }) => {
    const location = useLocation();

    const isAuthPage =
        location.pathname === LOGIN_ROUTE ||
        location.pathname === SIGN_UP_ROUTE;

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("token");
        setIsActive(false);
        showNotion(NOTION.SUCCESS, "Вы вышли из аккаунта");
    };

    const { isAuth } = useUser();

    return (
        <>
            {!isAuthPage && (
                <>
                    {isAuth ? (
                        <span
                            onClick={handleLogout}
                            className={cn("auth-link", className)}
                        >
                            <i className="fas fa-sign-out-alt auth-link__icon"></i>{" "}
                            Выйти
                        </span>
                    ) : (
                        <Link
                            to={LOGIN_ROUTE}
                            className={cn("auth-link", className)}
                            onClick={() => setIsActive(false)}
                        >
                            <i className="fas fa-user auth-link__icon"></i> Вход
                        </Link>
                    )}
                </>
            )}
        </>
    );
};

export default AuthButton;
