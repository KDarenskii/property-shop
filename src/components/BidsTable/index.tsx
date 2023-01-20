import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectBids } from "../../store/bids/selectors";
import { fetchBids } from "../../store/bids/thunks/fetchBids";
import TableBid from "../TableBid";
import { ALERT_TYPES } from "../../constants/alertTypes";
import Alert from "../Alert";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";

import "./styles.scss";
import BidsTableHeader from "./BidsTableHeader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto 30px",
    borderWidth: "3px",
};

const BidsTable: React.FC = () => {
    const { isLoading, error, list, totalCount } = useAppSelector(selectBids);

    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const limit = 4;
    const totalPages = Math.ceil(Number(totalCount) / limit);

    React.useEffect(() => {
        dispatch(fetchBids({ query: searchParams.toString(), limit }));
    }, [dispatch, searchParams, limit]);

    return (
        <>
            <table className="bids-table">
                <BidsTableHeader />
                <tbody className="bids-table__body">
                    {!isLoading &&
                        list.map((bid) => <TableBid key={bid.id} {...bid} />)}
                </tbody>
            </table>
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            {!error && !isLoading && list.length < 1 && (
                <Alert
                    type={ALERT_TYPES.INFO}
                    message={"Список заявок пуст."}
                />
            )}
            {isLoading && (
                <>
                    <ClipLoader
                        loading={isLoading}
                        cssOverride={override}
                        color={"#dc0909"}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        speedMultiplier={0.6}
                    />
                </>
            )}
            {totalPages > 1 && !isLoading && (
                <Pagination limit={limit} totalPages={totalPages} />
            )}
        </>
    );
};

export default BidsTable;
