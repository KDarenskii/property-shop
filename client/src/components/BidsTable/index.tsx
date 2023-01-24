import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectBids } from "../../store/bids/selectors";
import { fetchBids } from "../../store/bids/thunks/fetchBids";
import TableBid from "../TableBid";
import { ALERT_TYPES } from "../../constants/alertTypes";
import Alert from "../Alert";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";
import BidsTableHeader from "./BidsTableHeader";
import BidLoader from "../BidLoader";

import "./styles.scss";

const BidsTable: React.FC = () => {

    const { isLoading, error, list, totalCount } = useAppSelector(selectBids);

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

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
                    {!isLoading && list.map((bid) => <TableBid key={bid.id} {...bid} />)}
                </tbody>
            </table>
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            {!error && !isLoading && list.length < 1 && <Alert type={ALERT_TYPES.INFO} message={"Список заявок пуст."} /> }
            {isLoading && <BidLoader />}
            {totalPages > 1 && !isLoading && <Pagination limit={limit} totalPages={totalPages} />}
        </>
    );
};

export default BidsTable;