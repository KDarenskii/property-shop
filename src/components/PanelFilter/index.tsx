import React from "react";
import { useSearchParams } from "react-router-dom";

import './styles.scss';

type SortList = {
    sortName: string; 
    isASC: boolean;
}

type sortOrder = {
    complex_name: boolean
    rooms: boolean
    square: boolean
    price_sq_m: boolean
    price_total: boolean
}

const PanelFilter: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const getInitialSortList = (): SortList[] | null => {

        if (searchParams.has('_sort')) {
            const sortNames = searchParams.get('_sort') as string;
            const sortOrders = searchParams.get('_order') as string;

            const splitedNames = sortNames.split(',');
            const splitedOrders = sortOrders.split(',');

            const arr: SortList[] = [];

            for (let i = 0; i < splitedNames.length; i++) {
                arr.push({sortName: splitedNames[i], isASC: splitedOrders[i] === 'asc'});
            }

            return arr;
        }

        return null;
    }

    let sortList: SortList[] = getInitialSortList() || [];

    const [sortOrder, setSortOrder] = React.useState<sortOrder>({
        complex_name: sortList.find(item => item.sortName === 'complex_name')?.isASC ?? false,
        rooms: sortList.find(item => item.sortName === 'rooms')?.isASC ?? false,
        square: sortList.find(item => item.sortName === 'square')?.isASC ?? false,
        price_sq_m: sortList.find(item => item.sortName === 'price_sq_m')?.isASC ?? false,
        price_total: sortList.find(item => item.sortName === 'price_total')?.isASC ?? false
    });

    const handleSortClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        
        const target = event.target as HTMLDivElement;
        const sortName = target.dataset.sort as string;

        setSortOrder(prev => ({...prev, ...{ [sortName]: !prev[sortName as keyof sortOrder] } }));

        const sortItem = sortList.find(item => item.sortName === sortName);

        if (!sortItem) {
            sortList.push({sortName, isASC: true});
        } else {
            sortList = sortList.map(item => (item.sortName === sortName) ? {...item, isASC: !item.isASC} : item);
        }

        let sortQuery: string = '';
        let orderQuery: string = '';

        sortList.forEach(item => {
            sortQuery = sortQuery + item.sortName + ',';
            orderQuery = (item.isASC) ? orderQuery + 'asc,' : orderQuery + 'desc,';
        });

        searchParams.set('_sort', sortQuery.slice(0, sortQuery.length - 1));
        searchParams.set('_order', orderQuery.slice(0, orderQuery.length - 1));
        searchParams.delete('_limit');
        searchParams.delete('_page');
        setSearchParams(searchParams);
    }

    return (
        <div className="panels-filter">
            <div className="panels-filter__element">
                <div className="panels-filter__name panels-filter__name--no-hover">Артикул</div>
            </div>
            <div className="panels-filter__element">
                <div onClick={handleSortClick} className={`panels-filter__name ${sortOrder.complex_name ? 'asc' : 'desc'}`} data-sort="complex_name">ЖК</div>
            </div>
            <div className="panels-filter__element">
                <div className="panels-filter__name panels-filter__name--no-hover">Корпус</div>
            </div>
            <div className="panels-filter__element">
                <div className="panels-filter__name panels-filter__name--no-hover">Этаж</div>
            </div>
            <div className="panels-filter__element">
                <div onClick={handleSortClick} className={`panels-filter__name ${sortOrder.rooms ? 'asc' : 'desc'}`} data-sort="rooms">Комнат</div>
            </div>
            <div className="panels-filter__element">
                <div onClick={handleSortClick} className={`panels-filter__name ${sortOrder.square ? 'asc' : 'desc'}`} data-sort="square">Площадь</div>
            </div>
            <div className="panels-filter__element">
                <div onClick={handleSortClick} className={`panels-filter__name ${sortOrder.price_sq_m ? 'asc' : 'desc'}`} data-sort="price_sq_m">м2</div>
            </div>
            <div className="panels-filter__element">
                <div onClick={handleSortClick} className={`panels-filter__name ${sortOrder.price_total ? 'asc' : 'desc'}`} data-sort="price_total">Стоимость</div>
            </div>
            <div className="panels-filter__element">
                <div className="panels-filter__name panels-filter__name--no-hover">Избранное</div>
            </div>
        </div>
    );
};

export default PanelFilter;
