import { memo } from "react";
import { useGetReportStatisticsQuery } from "../../api";
import { useSelector } from "react-redux";

import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";

import "./reportStatistics.scss"

const ListItem = ({title, value}) => {
    return (
        <li className="report-statistics__item">
            <div className="report-statistics__subtitle">
                {title}
            </div>
            <div className="report-statistics__text">
                {value}
            </div>
        </li>
    )
}

export const ReportStatistics = memo(() => {
    const dataRange = useSelector(state => state.rangeCalendar.dateRange);
    const {
        data = {
            profit: null, 
            income: null, 
            self_cost: null, 
            total_additional_expenses: null
        },
        isFetching,
        isError,
        error
    } = useGetReportStatisticsQuery(dataRange);

    if(isFetching) return <Loading/>
    if(isError) return <Error error={error}/>

    return (
        <div className="report-statistics">
            <ul className="report-statistics__list">
                <ListItem 
                    title="Общая прибыль" 
                    value={data.profit}
                />
                <ListItem 
                    title="Себестоимость" 
                    value={data.income}
                />
                <ListItem 
                    title="Доп. расходы" 
                    value={data.self_cost}
                />
                <ListItem 
                    title="Чистая прибыль" 
                    value={data.total_additional_expenses}
                />
            </ul>
        </div>
    )
})