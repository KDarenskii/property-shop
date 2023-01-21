import React from "react";
import ViewButtons from "./ViewButtons";
import Sort from "../Sort";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectListView } from "../../store/products/selectors";

import "./style.scss";

const ViewOptions: React.FC = () => {

    const listView = useAppSelector(selectListView);

    const sortOptions = (
        <>
            <option value="empty">Выберите</option>
            <option value="price_total-asc">по цене ↑</option>
            <option value="price_total-desc">по цене ↓</option>
            <option value="square-asc">по площади ↑</option>
            <option value="square-desc">по площади ↓</option>
            <option value="rooms-asc">по кол-ву комнат ↑</option>
            <option value="rooms-desc">по кол-ву комнат ↓</option>
            <option value="complex_name-asc">по ЖК ↑</option>
            <option value="complex_name-desc">по ЖК ↓</option>
            <option value="price_sq_m-asc">по ₽/м2 ↑</option>
            <option value="price_sq_m-desc">по ₽/м2 ↓</option>
        </>
    );

    return (
        <div className="view-options">
            {listView === "cards" && <Sort children={sortOptions} />}
            <ViewButtons />
        </div>
    );
};

export default ViewOptions;
