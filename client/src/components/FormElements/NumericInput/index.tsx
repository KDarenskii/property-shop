import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import "./styles.scss";

type NumericInputProps = NumericFormatProps<React.InputHTMLAttributes<HTMLInputElement>>;

const NumericInput: React.FC<NumericInputProps> = ({ ...rest }) => {
    return <NumericFormat {...rest} className={`numeric-input ${rest.className ?? ""}`} />;
};

export default NumericInput;
