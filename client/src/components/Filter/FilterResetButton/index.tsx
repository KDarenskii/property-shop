import React from "react";
import { useSearchParams } from "react-router-dom";
import multiplyIconSrc from "../../../assets/img/icons/multiply-black.png";

import "./styles.scss";

const FilterResetButton: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <button onClick={() => setSearchParams("")} className="filter-reset-btn" type="reset">
            Сбросить фильтр
            <img className="filter-reset-btn__img" src={multiplyIconSrc} alt="Reset" />
        </button>
    );
};

export default FilterResetButton;
