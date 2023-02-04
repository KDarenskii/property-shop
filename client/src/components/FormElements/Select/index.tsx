import React from "react";

import "./styles.scss";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ ...rest }) => {
    return (
        <select {...rest} className={`select ${rest.className ?? ""}`}>
            {rest.children}
        </select>
    );
};

export default Select;
