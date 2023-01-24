import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { LoaderSizeProps } from 'react-spinners/helpers/props';

const override: React.CSSProperties = {
    borderWidth: '3px',
}

const CircleLoader: React.FC<LoaderSizeProps> = ({ ...props }) => {
    return (
        <ClipLoader
            color={'#007bff'}
            size={50}
            speedMultiplier={0.6}
            cssOverride={override}
            {...props}
        />
    )
}

export default CircleLoader;