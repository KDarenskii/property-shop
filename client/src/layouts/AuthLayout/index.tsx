import React from 'react'
import { Outlet } from 'react-router-dom';

import './styles.scss';

const AuthLayout: React.FC = () => {
    return (
        <section className='auth'>
            <div className="auth__content">
                <Outlet />
            </div>
        </section>
    )
}

export default AuthLayout