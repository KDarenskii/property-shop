import React from "react";
import { useSearchParams } from 'react-router-dom';

import './styles.scss';

type ComplexesProps = { complexNames: string[] };

const Complexes: React.FC<ComplexesProps> = ({ complexNames }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeComplex = searchParams.get('complex_name') ?? 'all';

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (event.target.value !== 'all') {
            searchParams.set('complex_name', value);
        } else {
            searchParams.delete('complex_name');
        }
        searchParams.delete('_limit');
        searchParams.delete('_page');
        setSearchParams(searchParams);
    }

    return (
        <div className="complexes">
            <div className="complexes__label label">Выбор проекта:</div>
            <select 
                onChange={handleChange} 
                name="complex" 
                value={activeComplex} 
                className="complexes__select select control"
            >
                <option value="all">Все проекты</option>
                {complexNames.map((complex, index) => <option key={index} value={complex}>ЖК {complex}</option>)}
            </select>
        </div>
    );
};

export default Complexes;
