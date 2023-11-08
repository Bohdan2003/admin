import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../filters/filtersSlice";
import { useGetReportProductsQuery } from "../../api";

import { Search } from "../search/Search";
import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";

import "./reportProductsTable.scss";

const page = "reportProducts";

const TableItem = memo(({art, name, cat, average, quantity, price}) => {
    return (
        <tr>
            <td>{art}</td>
            <td>{name}</td>
            <td>{cat}</td>
            <td>{average}</td>
            <td>{quantity}</td>
            <td>{price}</td>
        </tr>
    )
})

export const ReportProductsTable = memo(() => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.filters[page].values.search);
    const dateRange = useSelector(state => state.rangeCalendar.dateRange);
    const { 
        data = [], 
        isFetching,
        isLoading, 
        isError, 
        error 
    } = useGetReportProductsQuery({search, dateRange});

    return (
        <div className="report-products">
            <Search
                placeholder="Найти продукт"
                value={search}
                setValue={value => {
                    dispatch(setSearch({ page, value }));
                }}
            />
            <table>
                <thead>
                    <tr>
                        <th width={166}>Код</th>
                        <th width={538}>Наименование</th>
                        <th width={260}>Категория</th>
                        <th width={166}>Средняя цена</th>
                        <th width={166}>Продано</th>
                        <th width={166}>Общий доход</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length === 0 && 
                        !isFetching &&
                        !isError &&
                        <tr><td width={200}>Товаров нет</td></tr>
                    }
                    {
                        data.length > 0 && data &&
                        data.map((item, i) => <TableItem {...item} key={i}/>)
                    }
                </tbody>
            </table>
            { isLoading && <Loading/> }
            { isError && <Error error={error}/> }
        </div>
    )
})