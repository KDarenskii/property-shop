import React from 'react'

import './styles.scss';

const BidsTableHeader: React.FC = () => {
    return (
        <thead className="bids-table-header">
            <tr className="bids-table-header__row">
                <th className="bids-table-header__th" style={{ width: 70 }}>
                    ID
                </th>
                <th className="bids-table-header__th" style={{ width: 110 }}>
                    дата
                </th>
                <th className="bids-table-header__th" style={{ width: 170 }}>
                    Услуга
                </th>
                <th className="bids-table-header__th">имя</th>
                <th className="bids-table-header__th">email</th>
                <th className="bids-table-header__th">телефон</th>
                <th className="bids-table-header__th" style={{ width: 130 }}>
                    статус
                </th>
            </tr>
        </thead>
    )
}

export default BidsTableHeader