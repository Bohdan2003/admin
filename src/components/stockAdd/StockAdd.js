import { useSelector } from "react-redux";
import { useGetLastAddedItemsQuery } from "../../api";

import { StockTableCreateItem } from "../stockTableCreateItem/StockTableCreateItem";
import { StockTableCreateItems } from "../stockTableCreateItems/StockTableCreateItems";
import { Filters } from "../filters/Filters";
import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";
import { StockTable } from "../stockTable/StockTable";

import "./stockAdd.scss"

const page = "stockAdd";

export const StockAdd = () => {
    const activeSection = useSelector(state => state.stock.activeSection);
    const { data, isLoading, isError, error } = useGetLastAddedItemsQuery();

    const setTable = () => {
        if(isLoading) return <Loading/>;
        if(isError) return <Error error={error}/>;

        return <StockTable items={data} hiddenHead/>
    }

    const tabel = setTable();

    return (
        <div className="stock-add">
            <div className="stock-add__top">
                <Filters page={page} visible hiddenTeg/>
                { activeSection == "add" && <StockTableCreateItem page={page}/>} 
                { activeSection == "download" && <StockTableCreateItems page={page}/>} 
                <div className="stock-add__table-head">
                    Недавно добавленные
                </div>
            </div>
            { tabel }
        </div>
    )
};