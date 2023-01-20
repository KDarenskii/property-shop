import React from "react";

type MenuOptions = [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>];

export const useMenu = (): MenuOptions => {
    const [isActive, setIsActive] = React.useState(false);
    const toggle = () => {
        document.body.classList.toggle('lock');
        setIsActive(prev => !prev);
    }

    return [isActive, toggle, setIsActive];
}