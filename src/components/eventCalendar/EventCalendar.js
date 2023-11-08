import { useState, useEffect, useRef } from "react";
import { 
    useGetCalendarEventsQuery, 
    useCreateCalendarEventMutation 
} from "../../api";
import { convertDate } from "../../utils/helper";
import { ConverIntoFloatNumber } from "../../utils/helper";
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import { api } from "../../api";

import { Error } from "../error/Error"
import { Formik, Form, Field } from 'formik';
import Calendar from 'react-calendar';

import "./eventCalendar.scss";

const useClickOutside = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
  };

export const EventCalendar = () => {
    const dispatch = useDispatch();
    const calendarRef = useRef();
    useClickOutside(calendarRef, () => {
        setVisibilityCalendar(false);
    });

    const [visibilityCalendar, setVisibilityCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventValue, setEventValue] = useState(0);
    const { 
        data: events = []
    } = useGetCalendarEventsQuery();
    const [
        createEvent,
        {
            isFetching, 
            isError, 
            error 
        }
    ] = useCreateCalendarEventMutation();
    
    const handleDayClick = (date) => {
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

    if(isError) return <Error error={error}/>

    return (
        <div 
            className="event-calendar"
            ref={calendarRef}
        >
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
                <div 
                    className={`
                        event-calendar__box
                        ${
                            isFetching 
                            ? 'event-calendar__box--loading'
                            : ''
                        }
                    `}
                >
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
                            }).unwrap()
                                .then(res => {
                                    setEventValue(res.value)
                                    dispatch(api.util.updateQueryData(
                                        'getCalendarEvents', 
                                        undefined, 
                                        (draftPosts) => [...draftPosts, res]
                                    ))
                                })
                                .catch(err => { console.log(err); })
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
                                        className={`
                                            event-calendar__form-btn
                                            values.value = ${values.value}
                                            eventValue = ${eventValue}
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