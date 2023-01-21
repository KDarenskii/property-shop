import React from "react";
import { useSearchParams } from "react-router-dom";
import Select from "../FormElements/Select";

import './styles.scss';

type SortProps = {
    className?: string;
    children: React.ReactNode;
}

const Sort: React.FC<SortProps> = ({ children, className = '' }) => {

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
        <div className={`sort ${className}`}>
            <label className="sort__label label">
                Сортировать
                <Select
                    onChange={handleChange}
                    value={initialValue}
                    name="sortby"
                >
                    {children}
                </Select>
            </label>
        </div>
    );
};

export default Sort;