import React from "react";
import { HOME_ROUTE } from "../../constants/routesPathNames";
import { Link } from "react-router-dom";

import "./styles.scss";

const UnauthorizedPage: React.FC = () => {
    return (
        <section className="unauthorized">
            <header className="unauthorized__header">
                <h2 className="unauthorized__title">Whoops!</h2>
                <p className="unauthorized__subtitle">У вас не достаточно прав для доступа к данной странице</p>
            </header>
            <i className="fas fa-lock unauthorized__icon"></i>
            <p className="unauthorized__text">
                Может, вы хотите перейти на{" "}
                <Link className="unauthorized__link" to={HOME_ROUTE}>
                    главную
                </Link>
                ?
            </p>
        </section>
    );
};

export default UnauthorizedPage;
