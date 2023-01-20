import React from 'react'
import { useSearchParams } from 'react-router-dom';

import './styles.scss';

const BidsTypes: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (value === 'Все') searchParams.delete('type');
        else searchParams.set('type', value);
        searchParams.delete('_page');
        setSearchParams(searchParams);
    }

    return (
        <select 
            onChange={handleTypeChange} 
            className="bids-filter-select select"
            defaultValue={searchParams.has('type') ? searchParams.get('type') as string : 'Все'}
        >
            <option value="Все">Все заявки</option>
            <option value="Бронирование">Бронирование</option>
            <option value="Просмотр">Просмотр</option>
        </select>
    )
}

export default BidsTypes