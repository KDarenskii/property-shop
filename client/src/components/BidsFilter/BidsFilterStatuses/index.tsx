import React from "react";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import { BID_STATUSE } from "../../../constants/bidStatuse";

import "./styles.scss";

const BidsFilterStatuses: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleStatusClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const list = event.currentTarget;
        const target = event.target as HTMLDivElement;

        if (target.closest("[data-value]")) {
            const value = target.dataset.value as string;
            list.querySelectorAll("[data-value]").forEach((btn) => btn.classList.remove("active"));
            target.classList.add("active");

            if (value === "ALL") searchParams.delete("status");
            else searchParams.set("status", value);

            searchParams.delete("_page");
            setSearchParams(searchParams);
        }
    };

    return (
        <div onClick={handleStatusClick} className="bids-filter-statuses">
            <button className="bids-filter-statuses__btn" data-value="ALL">
                Все
            </button>
            <button
                className={cn('bids-filter-statuses__btn', { 'bids-filter-statuses__btn--active': searchParams.get("status") === BID_STATUSE.NEW })}
                data-value={BID_STATUSE.NEW}
            >
                Новые
            </button>
            <button
                className={cn('bids-filter-statuses__btn', { 'bids-filter-statuses__btn--active': searchParams.get("status") === BID_STATUSE.IN_WORK })}
                data-value={BID_STATUSE.IN_WORK}
            >
                В работе
            </button>
            <button
                className={cn('bids-filter-statuses__btn', { 'bids-filter-statuses__btn--active': searchParams.get("status") === BID_STATUSE.COMPLETED })}
                data-value={BID_STATUSE.COMPLETED}
            >
                Завершенные
            </button>
        </div>
    );
};

export default BidsFilterStatuses;
