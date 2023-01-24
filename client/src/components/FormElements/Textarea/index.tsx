import React, { TextareaHTMLAttributes } from 'react'

import './styles.scss';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: React.FC<TextareaProps> = ({ className = '', ...rest }) => {
    return (
        <textarea {...rest} className={`textarea ${className}`}></textarea>
    )
}

export default Textarea