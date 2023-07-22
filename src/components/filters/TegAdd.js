import { useState, useEffect } from "react";
import { useCreateTegMutation } from "../../api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { Error } from "../error/Error";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as SaveIcon } from "../../assets/save.svg";
import { ReactComponent as CancleIcon } from "../../assets/delete.svg";

export const TegAdd = ({firstItem = false, filterAddProps}) => {
    const [ createTeg, { isLoading, isError, error } ] = useCreateTegMutation();
    const [ visibleForm, setVisibleForm ] = useState(false)

    useEffect(() => {
        setVisibleForm(firstItem);
    }, [firstItem])

    if(isError) return <Error error={error}/>

    return (
        <div className={`filters-add ${isLoading ? 'filters-add--disable' : ''}`}>
            {
                visibleForm
                ?
                <Formik
                    initialValues={{ name: ''}}
                    validationSchema={yup.object({
                        name: yup.string()
                            .required("Обязательое поле")
                            .min(3, "Минимум 3 символа")
                            .max(20, "Максимум 20 символов")
                    })}
                    onSubmit={(values, {resetForm}) => {
                        createTeg({
                            name: values.name,
                            ...filterAddProps
                        }).unwrap()
                            .then(() => {
                                resetForm();
                            })
                            .catch()              
                    }}
                >
                    <Form className='filters-add__form'>
                        <div className="filters-add__form-inner">
                            <Field className="filters-add__input"
                                    name="name"
                                    type="text"    
                            />
                            <button className="filters-add__btn-save"
                                    type="submit"
                            ><SaveIcon/></button>
                            {
                                firstItem
                                ? ''
                                : <button className="filters-add__btn-cancel"
                                      type="button"
                                      onClick={() => {
                                          setVisibleForm(false);
                                      }}
                                  ><CancleIcon/></button>
                            }
                        </div>
                        <ErrorMessage className="filters-add__error error" 
                                    name="name" 
                                    component="div"
                        />
                    </Form>
                </Formik>
                :
                <button className="filters-add__btn filters-add__btn--visible"
                        onClick={() => {
                            setVisibleForm(true)
                        }}
                >
                    <PlusIcon/>
                </button>
            }
            
        </div>
    )
}