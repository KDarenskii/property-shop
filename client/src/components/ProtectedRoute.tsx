import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from '../constants/routesPathNames';
import { useUser } from '../hooks/useUser';

type ProtectedRouteProps = {
    allowedRoles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {

    const { isAuth, user } = useUser();
    const location = useLocation();

    const renderRoute = (): JSX.Element => {

        const isAllowedRole = user?.roles?.find(role => allowedRoles.includes(role));

        if (isAuth && Boolean(isAllowedRole)) {
            return <Outlet />
        } else if (isAuth) {
            return <Navigate to={UNAUTHORIZED_ROUTE} state={{ from: location }} replace />
        } else {
            return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
        }

    }

    return renderRoute();
}

export default ProtectedRoute;