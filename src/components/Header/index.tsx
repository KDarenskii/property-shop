import React from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../hooks/useMenu";
import Menu from "./Menu";
import MenuButton from "./MenuButton";

import "./styles.scss";

const Header: React.FC = () => {
    const [isActive, toggle] = useMenu();

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <Link
                            to="/"
                            className="header__link header__link--logo"
                        >
                            <img
                                className="header__logo"
                                src="/img/icons/logo-icon.png"
                                alt="Logo"
                            />
                            <p className="header__logo-text">
                                интернет магазин недвижимости
                            </p>
                        </Link>
                        <MenuButton isActive={isActive} toggle={toggle} />
                        <Menu isActive={isActive} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
