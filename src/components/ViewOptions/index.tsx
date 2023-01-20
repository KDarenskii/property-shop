import React from "react";
import ViewButtons from "./ViewButtons";
import Sort from "../Sort";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectListView } from "../../store/products/selectors";

import "./style.scss";

const ViewOptions: React.FC = () => {
    const listView = useAppSelector(selectListView);

    return (
        <div className="view-options">
            {listView === "cards" && <Sort />}
            <ViewButtons />
        </div>
    );
};

export default ViewOptions;
