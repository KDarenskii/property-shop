import React from "react";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routesPathNames";

import "./styles.scss";

const MissingPage: React.FC = () => {
    return (
        <section className="missing">
            <header className="missing__header">
                <h2 className="missing__title">Whoops!</h2>
                <p className="missing__subtitle">404 Страница не найдена</p>
            </header>
            <i className="far fa-frown-open missing__icon"></i>
            <p className="missing__text">
                Может, вы хотите перейти на{" "}
                <Link className="missing__link" to={HOME_ROUTE}>
                    главную
                </Link>
                ?
            </p>
        </section>
    );
};

export default MissingPage;
