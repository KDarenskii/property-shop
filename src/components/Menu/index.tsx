import React from "react";
import { Link } from "react-router-dom";
import AuthButton from "../AuthButton";

import "./styles.scss";

type MenuProps = {
    isActive: boolean;
};

const Menu: React.FC<MenuProps> = ({ isActive }) => {

    return (
        <div className={`menu ${isActive ? "menu--active" : ""}`}>
            <div className="menu__phone">
                <a
                    className="menu__link menu__link--underline"
                    href="tel:+8800131313"
                >
                    <i className="fas fa-mobile menu__icon"></i>8 (800)
                    13-13-13
                </a>
                <p className="menu__phone-text">Звонок бесплатный</p>
            </div>
            <nav className="menu__nav">
                <AuthButton className={'menu__link'} />
                <Link to="favourites" className="menu__link">
                    <i className="fas fa-heart menu__icon"></i>Избранное{" "}
                </Link>
                <Link to="bids" className="menu__link">
                    <i className="fas fa-file-alt menu__icon"></i>Заявки
                </Link>
            </nav>
        </div>
    );
};

export default Menu;
