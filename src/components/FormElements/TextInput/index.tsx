import React, { InputHTMLAttributes } from 'react';

import './styles.scss';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<TextInputProps> = ({...rest}) => {
    return (
        <input {...rest} className={`text-input ${rest.className}`} />
    )
}

export default TextInput