import { useEffect } from 'react';
import { setActiveTable } from './reportSlice';
import { useDispatch, useSelector } from 'react-redux';

import { RangeCalendar } from '../rangeCalendar/RangeCalendar';
import { EventCalendar } from '../eventCalendar/EventCalendar';
import { ReportStatistics } from '../reportStatistics/ReportStatistics';
import { ReportOrdersTable } from '../reportOrdersTable/ReportOrdersTable';
import { ReportProductsTable } from '../reportProductsTable/ReportProductsTable';

import './report.scss';

const Button = ({ activeTable, nameTable, text }) => {
    const dispatch = useDispatch();

    return (
        <button
            className={`report__btn 
                ${ activeTable == nameTable ? 'report__btn--active' : ''}`
            }
            onClick={() => {
                dispatch(setActiveTable(nameTable))
            }}
        >{text}</button>
    )
}

const Table = () => {
    const activeTable = useSelector(state => state.report.activeTable);

    return (
        <>     
            <div className="report__btns">
                <Button
                    activeTable={activeTable}
                    nameTable="orders"
                    text="Заказы"
                />
                <Button
                    activeTable={activeTable}
                    nameTable="products"
                    text="Товары"
                />
            </div>   
            { activeTable == "orders" && <ReportOrdersTable/> }
            { activeTable == "products" && <ReportProductsTable/> }
        </>       
    )
}

const Report = () => {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <section className="report">
            <div className="report__top">
                <RangeCalendar/>
                <EventCalendar/>
            </div>
            <ReportStatistics/>
            <Table/>
        </section>
    )
}

export default Report