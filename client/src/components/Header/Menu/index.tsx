import React from "react";
import { Link } from "react-router-dom";
import AuthButton from "../../Buttons/AuthButton";
import { ROLES } from "../../../constants/roles";
import cn from "classnames";
import AccessCheck from "../../AccessCheck";

import "./styles.scss";

type MenuProps = {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: React.FC<MenuProps> = ({ isActive, setIsActive }) => {
    return (
        <div className={cn("menu", { "menu--active": isActive })}>
            <div className="menu__phone">
                <a className="menu__link menu__link--underline" href="tel:+8800131313">
                    <i className="fas fa-mobile menu__icon"></i>8 (800) 13-13-13
                </a>
                <p className="menu__phone-text">Звонок бесплатный</p>
            </div>
            <nav className="menu__nav">
                <AuthButton className={"menu__link"} setIsActive={setIsActive} />
                <Link to="favourites" className="menu__link" onClick={() => setIsActive(false)}>
                    <i className="fas fa-heart menu__icon"></i>Избранное{" "}
                </Link>
                <AccessCheck allowedRoles={[ROLES.ADMIN]}>
                    <Link to="bids" className="menu__link" onClick={() => setIsActive(false)}>
                        <i className="fas fa-file-alt menu__icon"></i>Заявки
                    </Link>
                </AccessCheck>
            </nav>
        </div>
    );
};

export default Menu;