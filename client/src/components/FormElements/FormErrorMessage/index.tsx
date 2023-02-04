import React from "react";

import "./styles.scss";

type FormErrorMessageProps = {
    text: string;
};

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ text }) => {
    return <p className="form-error-message">{text}</p>;
};

export default FormErrorMessage;
