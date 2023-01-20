import React from "react";
import { HTTP_STATUS, THtppStatus } from "../../constants/httpStatuses";
import FormsResult from "../FormsResult.tsx";
import ViewingForm from "../ViewingForm";

import "./styles.scss";

export type ViewingResult = {
    status: THtppStatus;
    message: string;
};

const Viewing: React.FC = () => {
    const [result, setResult] = React.useState<ViewingResult>({
        status: HTTP_STATUS.IDLE,
        message: "",
    });

    return (
        <section className="viewing">
            <h4 className="viewing__title">Анкета просмотра</h4>
            {result.status === HTTP_STATUS.IDLE ? (
                <ViewingForm setResult={setResult} />
            ) : (
                <FormsResult {...result} />
            )}
        </section>
    );
};

export default Viewing;
