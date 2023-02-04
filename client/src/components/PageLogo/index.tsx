import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HOME_ROUTE, LOGIN_ROUTE, SIGN_UP_ROUTE } from '../../constants/routesPathNames';

import './styles.scss';

const PageLogo: React.FC = () => {

    const location = useLocation();
    const isAuthPage =
        location.pathname === LOGIN_ROUTE ||
        location.pathname === SIGN_UP_ROUTE;
        
    return (
        <>
            {!isAuthPage && (
                <div className="logo-wrapper">
                    <Link to={HOME_ROUTE} className="logo">
                        <div className="logo__title">КВАДРАТНЫЙ МЕТР</div>
                        <div className="logo__subtitle">
                            купить квартиру в один клик
                        </div>
                    </Link>
                </div>
            )}
        </>
    )
}

export default PageLogo