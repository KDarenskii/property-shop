import React from "react";
import { useSearchParams } from 'react-router-dom';

import './styles.scss';

type RoomsProps = { rooms: string[] };

const Rooms: React.FC<RoomsProps> = ({ rooms }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const roomsQuery = searchParams.getAll('rooms');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        searchParams.delete('rooms');
        
        const value = event.target.value;

        if (!roomsQuery.includes(value)) {
            roomsQuery.push(value);
        } else {
            const index = roomsQuery.findIndex(room => room === value);
            roomsQuery.splice(index, 1);
        }

        roomsQuery.forEach(value => searchParams.append('rooms', value));
        searchParams.delete('_limit');
        searchParams.delete('_page');
        setSearchParams(searchParams);
    };

    return (
        <div className="rooms">
            <div className="rooms__label label">Комнат:</div>
            <div className="rooms__wrapper">
                {rooms.map((room, index) => (
                    <label 
                        key={index} 
                        className={`rooms__btn ${roomsQuery.includes(room) ? 'rooms__btn--active' : ''}`}
                    >
                        <input
                            name="rooms"
                            type="checkbox"
                            checked={roomsQuery.includes(room)}
                            className="rooms__checkbox visually-hidden"
                            value={room}
                            onChange={handleChange}
                        />
                        {room}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Rooms;
