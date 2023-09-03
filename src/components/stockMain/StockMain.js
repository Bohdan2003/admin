import { useGetStockItemsQuery } from "../../api";
import { useSelector } from "react-redux";  

import { Filters } from "../filters/Filters";
import { StockTableInfiniteScroll } from "../stockTable/StockTable";

const Table = ({page}) => {
    const paginatePage = useSelector(state => state.infiniteScroll[page].page);
    const filters = useSelector(state => state.filters[page].values);
    
    const fetchProps = useGetStockItemsQuery({filters, page: paginatePage});

    return (
        <StockTableInfiniteScroll 
            fetchProps={fetchProps} 
            page={page}
        />
    )
}

export const StockMain = ({page, filtersRef}) => {
    return (
        <>
            <Filters page={page} filtersRef={filtersRef}/>
            <Table page={page}/>
        </>
    )
}