import { useGetStockItemsQuery } from "../../api";
import { useSelector } from "react-redux";  

import { Filters } from "../filters/Filters";
import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";
import { StockTable } from "../stockTable/StockTable";

export const StockMain = ({page, filtersRef}) => {
    
    const filters = useSelector(state => state.filters[page].values);
    const { 
        data = [], 
        isLoading, 
        isError, 
        error 
    } = useGetStockItemsQuery(filters);

    const setContent = () => {
        if(isLoading) return <Loading/>;
        if(isError) return <Error error={error}/>;

        return <StockTable items={data}/>
    }

    const table = setContent()

    return (
        <>
            <Filters page={page} filtersRef={filtersRef}/>
            {table}
        </>
    )
}