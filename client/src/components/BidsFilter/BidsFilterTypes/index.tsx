import React from 'react'
import { useSearchParams } from 'react-router-dom';
import Select from '../../FormElements/Select';

import './styles.scss';

const BidsTypes: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (value === 'ALL') searchParams.delete('type');
        else searchParams.set('type', value);
        searchParams.delete('_page');
        setSearchParams(searchParams);
    }

    return (
        <Select
            onChange={handleTypeChange} 
            className={'bids-filter-select'}
            defaultValue={searchParams.has('type') ? searchParams.get('type') as string : 'ALL'}
        >
            <option value="ALL">Все заявки</option>
            <option value="BOOKING">Бронирование</option>
            <option value="VIEWING">Просмотр</option>
        </Select>
    )
}

export default BidsTypes