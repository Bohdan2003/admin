import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetLastAddedItemsQuery } from "../../api";

import { StockCreateItem } from "../stockCreateItem/StockCreateItem";
import { StockCreateItems } from "../stockCreateItems/StockCreateItems";
import { Filters } from "../filters/Filters";
import { StockTable } from "../stockTable/StockTable";

import "./stockAdd.scss"

const page = "stockAdd";

const Table = () => {
    const fetchProps = useGetLastAddedItemsQuery();

    return (
        <StockTable 
            fetchProps={fetchProps} 
            hiddenHead
        />
    )
}

export const StockAdd = () => {
    const activeSection = useSelector(state => state.stock.activeSection);

    return (
        <div className="stock-add">
            <div className="stock-add__top">
                <Filters page={page} visible hiddenTeg/>
                { activeSection == "add" && <StockCreateItem page={page}/>} 
                { activeSection == "download" && <StockCreateItems page={page}/>} 
                <div className="stock-add__table-head">
                    Недавно добавленные
                </div>
            </div>
            <Table/>
        </div>
    )
};