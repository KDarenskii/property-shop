import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import './styles.scss';

type PaginationProps = {
    limit: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ limit, totalPages }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (selected: { selected: number }) => {
        const newPage = selected.selected + 1;
        searchParams.set("_page", String(newPage));
        setSearchParams(searchParams);
    };

    return (
        <ReactPaginate
            className="pagination"
            nextLabel=">"
            previousLabel="<"
            pageCount={totalPages}
            pageRangeDisplayed={limit}
            pageClassName="pagination__page"
            previousClassName="pagination__page"
            nextClassName="pagination__page"
            activeClassName="pagination__page--active"
            pageLinkClassName="pagination__link"
            nextLinkClassName="pagination__link"
            previousLinkClassName="pagination__link"
            onPageChange={handlePageChange}
            forcePage={
                searchParams.has("_page")
                    ? Number(searchParams.get("_page")) - 1
                    : 0
            }
        />
    )
}

export default Pagination