import { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../filters/filtersSlice";
import { useGetReportOrdersQuery } from "../../api";

import { Search } from "../search/Search";
import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";
import { ReactComponent as ArrowUp } from "../../assets/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";

import "./reportOrdersTable.scss"

const page = 'reportOrders';

const TableItem = memo(({number, date, total_price, total_quantity, username, children}) => {
    const [productVisibility, setProductVisibility] = useState(false)

    return (
        <>
            <tr className={`${productVisibility ? 'no-border' : ''}`}>
                <td>{number}</td>
                <td>{date.slice(0,10).replace(/-/g, '.')}</td>
                <td>{total_price}</td>
                <td>{total_quantity}</td>
                <td>{username}</td>
                <td>
                    <button 
                        onClick={() => {setProductVisibility(value => !value)}}
                    >{ 
                        productVisibility 
                        ? <ArrowUp/> 
                        : <ArrowDown/> 
                    }</button>
                </td>
            </tr>
            {
                productVisibility &&
                <tr className="no-border">
                    <td colSpan="5">
                        <table>
                            <tbody>                               
                                <tr>
                                    <th>Код</th>
                                    <th>Наименование</th>
                                    <th>Количество</th>
                                    <th>Цена</th>
                                    <th>Общая стоимость</th>
                                </tr>
                                {
                                    children.map(({art, currency, name, price, quantity}) => (
                                        <tr>
                                            <td>{art}</td>
                                            <td>{name}</td>
                                            <td>{quantity}</td>
                                            <td>{price}</td>
                                            <td>{currency}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </td>
                </tr>
            }
        </>
    )
})

export const ReportOrdersTable = memo(() => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.filters[page].values.search);
    const dateRange = useSelector(state => state.rangeCalendar.dateRange);
    const { 
        data = [], 
        isLoading, 
        isError, 
        error 
    } = useGetReportOrdersQuery({search, dateRange});

    return (
        <div className="report-orders">
            <Search
                placeholder="Найти заказ"
                value={search}
                setValue={value => {
                    dispatch(setSearch({ page, value }));
                }}
            />
            <table>
                <thead>
                    <tr>
                        <th width={150}>Номер</th>
                        <th width={200}>Дата</th>
                        <th width={200}>Сумма заказа</th>
                        <th width={200}>Кол-во товаров</th>
                        <th width={450}>Инициалы</th>
                        <th width={26}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 &&
                        data.map(item => <TableItem {...item} key={item.id}/>)
                    }
                </tbody>
            </table>
            { isLoading && <Loading/> }
            { isError && <Error error={error}/> }
        </div>
    )
})