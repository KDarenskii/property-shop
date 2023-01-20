import React from "react";
import { useSearchParams } from "react-router-dom";

import './styles.scss';

const Sort: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [sortName, sortOrder] = event.target.value.split('-');

        if (sortName === 'empty') setSearchParams('');
        else {
            searchParams.set('_sort', sortName);
            searchParams.set('_order', sortOrder);
            setSearchParams(searchParams);
        }
    }

    const initialValue = searchParams.get('_sort') ? searchParams.get('_sort') + '-' + searchParams.get('_order') : 'empty';

    return (
        <div className="sort">
            <label htmlFor="sort-cards-by" className="sort__label label">
                Сортировать
            </label>
            <select
                onChange={handleChange}
                value={initialValue}
                id="sort-cards-by"
                name="sortby"
                className="sort__select select control"
            >
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
            </select>
        </div>
    );
};

export default Sort;