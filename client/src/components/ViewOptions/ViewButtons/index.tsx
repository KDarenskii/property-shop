import React from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setListView } from '../../../store/products/productsSlice';
import { selectListView } from '../../../store/products/selectors';
import { useWindowSize } from 'usehooks-ts'

import './styles.scss';

const ViewButtons: React.FC = () => {

    const dispatch = useAppDispatch();
    const activeView = useAppSelector(selectListView);

    const { width } = useWindowSize();

    React.useEffect(() => {
        if (width < 1170) dispatch(setListView('cards'));
    }, [width, dispatch])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setListView(event.currentTarget.value as "cards" | "panels"));
        const target = event.target;
        target.checked = target.value === activeView;
    };

    return (
        <div className="view-buttons">
            <label className={`view-buttons__label ${activeView === 'cards' ? 'view-buttons__label--active' : ''}`}>
                <i className="fas fa-th-large"></i>
                <input
                    type="radio"
                    className="visually-hidden view-btn"
                    name="displayType"
                    value="cards"
                    onChange={handleChange}
                    checked={activeView === "cards"}
                />
            </label>
            <label className={`view-buttons__label ${activeView === 'panels' ? 'view-buttons__label--active' : ''}`}>
                <i className="fas fa-bars"></i>
                <input
                    type="radio"
                    className="visually-hidden"
                    name="displayType"
                    value="panels"
                    onChange={handleChange}
                    checked={activeView === "panels"}
                />
            </label>
        </div>
    );
}

export default ViewButtons;