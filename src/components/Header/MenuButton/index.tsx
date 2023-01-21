import React from 'react'

import './styles.scss';

type MenuButtonProps = {
    isActive: boolean;
    toggle: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ isActive, toggle }) => {

    return (
        <div onClick={toggle} className={`menu-btn ${isActive ? 'menu-btn--active' : ''}`}><span></span></div>
    )
}

export default MenuButton