import { useState } from "react";
import { useGetCalendarEventsQuery, useCrateCalendarEventMutation } from "../../api";
import { convertDate } from "../../utils/helper";
import { ConverIntoFloatNumber } from "../../utils/helper";
import * as yup from 'yup';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Calendar from 'react-calendar';

import "./eventCalendar.scss";

export const EventCalendar = () => {
    const [visibilityCalendar, setVisibilityCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventValue, setEventValue] = useState(0);
    const { 
        data: events = [], 
        isFetching, 
        isError, 
        error 
    } = useGetCalendarEventsQuery();
    const [
        createEvent
    ] = useCrateCalendarEventMutation();
    
    const handleDayClick = (date, event) => {
        setSelectedDate(date);
        const dateEvents = getEventsForDate(date);
        if(dateEvents.length > 0) {
            setEventValue(dateEvents[0].value);
        } else {
            setEventValue(0); 
        } 
    };
    
    const getEventsForDate = (date) => {
        return events.filter(event => event.date == convertDate(date));
    };

    return (
        <div className="event-calendar">
            <button 
                className="event-calendar__btn"
                onClick={() => {
                    setVisibilityCalendar(value => !value)
                }}
            >
                Установить доп. расходы
            </button>
            {
                visibilityCalendar &&
                <div className="event-calendar__box">
                    <Calendar
                        value={selectedDate}
                        onClickDay={handleDayClick}
                        showDoubleView
                        format="yyyy.MM.dd"
                        tileClassName={({date}) => {
                            const dateEvents = getEventsForDate(date);
                            if(dateEvents.length > 0) return 'react-calendar__tile--event'
                        }}
                    />
                    <Formik
                        initialValues={{ value: eventValue }}
                        validationSchema={yup.object({
                            value: yup.number()
                                        .min(1, "Расход не может равнятся 0")
                                        .required("Обязательое поле")
                        })}
                        enableReinitialize
                        onSubmit={(values) => {
                            createEvent({
                                value: values.value,
                                date: convertDate(selectedDate)
                            })
                        }}
                    >
                        {({setFieldValue, values}) => (
                            <Form className="event-calendar__form" >
                                <div className="event-calendar__form-box">
                                    <label 
                                        className="event-calendar__label"
                                        htmlFor="event-calendar__input"
                                    >Доп. расходы</label>
                                    <button
                                        className={`event-calendar__form-btn
                                            ${
                                                values.value == eventValue
                                                ? 'event-calendar__form-btn--hidden'
                                                : ''
                                            }
                                        `}
                                        type="submit"
                                    >Сохранить</button>
                                </div>
                                <Field
                                    className="event-calendar__input"
                                    id="event-calendar__input"
                                    type="text"
                                    name="value"
                                    onChange={(e) => {
                                        setFieldValue("value", ConverIntoFloatNumber(e.target.value));
                                    }}
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </div>
    )
}