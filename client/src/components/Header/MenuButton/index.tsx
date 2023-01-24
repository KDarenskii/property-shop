import React from 'react'
import cn from 'classnames';

import './styles.scss';

type MenuButtonProps = {
    isActive: boolean;
    toggle: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ isActive, toggle }) => {
    return (
        <div onClick={toggle} className={cn('menu-btn', { 'menu-btn--active': isActive })}>
            <span></span>
        </div>
    )
}

export default MenuButton