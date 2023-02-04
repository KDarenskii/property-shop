import React from 'react'
import { useUser } from '../hooks/useUser';

type AccessCheckProps = {
    children: React.ReactNode;
    allowedRoles: number[];
}

const AccessCheck: React.FC<AccessCheckProps> = ({ children, allowedRoles }) => {
    const { user, isAuth } = useUser();
    const hasAccess = user?.roles?.find(role => allowedRoles.includes(role));
    return (
        <>
            {(hasAccess && isAuth) ? children : null}
        </>
    )
}

export default AccessCheck