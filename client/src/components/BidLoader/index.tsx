import React from 'react';
import CircleLoader from '../CircleLoader';

import './styles.scss';

const BidLoader: React.FC = () => {
    return (
        <div className='bid-loader'>
            <CircleLoader />
        </div>
    )
}

export default BidLoader;