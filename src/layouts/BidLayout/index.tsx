import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BIDS_ROUTE } from "../../constants/routesPathNames";

import "./styles.scss";

const BidLayout: React.FC = () => {
    return (
        <section className="bid">
            <div className="container">
                <div className="bid__body">
                    <div className="bid__header">
                        <h4 className="bid__title">Данные о заявке</h4>
                        <Link to={BIDS_ROUTE} className="bid__link">
                            Все заявки
                        </Link>
                    </div>
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default BidLayout;
