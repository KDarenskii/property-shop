import React from 'react'
import { useSearchParams } from 'react-router-dom';

import './styles.scss';

const BidsFilterStatuses: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleStatusClick = (event: React.MouseEvent<HTMLDivElement>) => {
        
        const list = event.currentTarget;
        const target = event.target as HTMLDivElement;

        if (target.closest('[data-value]')) {
            const value = target.dataset.value as string;
            list.querySelectorAll('[data-value]').forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');

            if (value === 'Все') searchParams.delete('status');
            else searchParams.set('status', value);

            searchParams.delete('_page');
            setSearchParams(searchParams);
        }
        
    }

    return (
        <div onClick={handleStatusClick} className="bids-filter-statuses">
            <button 
                className="bids-filter-statuses__btn"
                 data-value="Все"
            >
                Все
            </button>
            <button 
                className={`bids-filter-statuses__btn ${searchParams.get('status') === 'Новая' ? 'bids-filter-statuses__btn--active' : '' }`} 
                data-value="Новая"
            >
                Новые
            </button>
            <button 
                className={`bids-filter-statuses__btn ${searchParams.get('status') === 'В работе' ? 'bids-filter-statuses__btn--active' : '' }`} 
                data-value="В работе"
            >
                В работе
             </button>
            <button 
                className={`bids-filter-statuses__btn ${searchParams.get('status') === 'Завершенная' ? 'bids-filter-statuses__btn--active' : '' }`} 
                data-value="Завершенная"
            >
                Завершенные
            </button>
        </div>
    )
}

export default BidsFilterStatuses;