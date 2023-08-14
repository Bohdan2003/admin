import { useGetEndingItemsQuery } from "../../api";

import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";
import { StockTable } from "../stockTable/StockTable";

export const StockEnds = () => {
    const { 
        data = [], 
        isLoading, 
        isError, 
        error 
    }  = useGetEndingItemsQuery();

    if(isLoading) return <Loading/>;
    if(isError) return <Error error={error}/>;

    return <StockTable items={data}/>
}