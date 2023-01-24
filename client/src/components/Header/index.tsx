import React from "react";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routesPathNames";
import { useMenu } from "../../hooks/useMenu";
import Menu from "./Menu";
import MenuButton from "./MenuButton";

import "./styles.scss";

const Header: React.FC = () => {
    
    const [isActive, toggle, setIsActive] = useMenu();

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <Link to={HOME_ROUTE} className="header__link header__link--logo">
                            <img className="header__logo" src="/img/icons/logo-icon.png" alt="Logo"/>
                            <p className="header__logo-text">интернет магазин недвижимости</p>
                        </Link>
                        <MenuButton isActive={isActive} toggle={toggle} />
                        <Menu isActive={isActive} setIsActive={setIsActive} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
