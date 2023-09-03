import { useGetEndingItemsQuery } from "../../api";

import { StockTable } from "../stockTable/StockTable";

export const StockEnds = () => {
    const fetchProps = useGetEndingItemsQuery();

    return <StockTable fetchProps={fetchProps}/>
}