import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from './rangeCalendarSlice';
import { convertDate } from '../../utils/helper';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { ReactComponent as CalendarIcon } from '../../assets/calendarIcon.svg';

import 'react-calendar/dist/Calendar.css';
import './rangeCalendar.scss'

export const RangeCalendar = memo(() => {
  const dispatch = useDispatch();
  const dateRange = useSelector(state => state.rangeCalendar.dateRange);

  const handleChange= (dateRange) => {
    dispatch(setDateRange([convertDate(dateRange[0]), convertDate(dateRange[1])]))
  }

  return (
    <div className="range-calendar">
      <DateRangePicker
        value={dateRange}
        onChange={handleChange}
        showDoubleView
        format="yyyy.MM.dd"
        calendarIcon={<CalendarIcon/>}
      />
    </div>
  );
})
