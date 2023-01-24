import React from "react";
import { useSearchParams } from 'react-router-dom';
import Select from "../../FormElements/Select";

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

    const options = (
        <>
            <option value="all">Все проекты</option>
            {complexNames.map((complex, index) => <option key={index} value={complex}>ЖК {complex}</option>)}
        </>
    )

    return (
        <div className="complexes">
            <label className="complexes__label">
                Выбор проекта:
                <Select 
                    className={'complexes__select'} 
                    value={activeComplex} 
                    onChange={handleChange} 
                    name={'complex'} 
                    children={options}
                />
            </label>
        </div>
    );
};

export default Complexes;
