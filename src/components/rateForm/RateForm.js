import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { ConverIntoFloatNumber } from '../../utils/helper';

import { ReactComponent as SaveIcon } from "../../assets/save.svg"
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
// import { ReactComponent as BucketIcon } from "../../assets/bucket.svg";
import { Error } from '../error/Error';

import "./rateForm.scss";

const setHiddenClass = (isError, cancel, values, props) => {
    if(
        isError ||
        !cancel &&
        values.name == props.name && 
        values.price_in_ua == props.price_in_ua && 
        values.symbol == props.symbol
    ) return 'rate-form__btn--hidden'
}

export const RateForm = ({ fetchProps, props, cancel, 
    // deleteProps = [
    //     () => {}, 
    //     { isLoading: false, isError: false, error: false }
    // ] 
    }) => {
    const [ fetch, { isLoading, isError, error }] = fetchProps;
    // const [ deleteItem, {
    //     isLoading: isLoadingDeleting, 
    //     isError: isDeleteError
    // } ] = deleteProps;
    const {
        name,
        price_in_ua,
        symbol,
        id
    } = props;

    return (
        <Formik
            initialValues={{...props}}
            validationSchema={yup.object({
                name: yup.string()
                        .min(3, true)
                        .required(true),
                price_in_ua: yup.number()
                        .required(true),
                symbol: yup.string()
                        .required(true)
            })}
            onSubmit={(values) => {
                fetch({body: values, id}).unwrap()
                    .then(() => {
                        if(cancel) cancel();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }}
        >
            {({ values, errors, touched, setFieldValue, setValues }) => (
                <Form className={`rate-form
                        ${  
                            isLoading 
                            // || isLoadingDeleting 
                            ? 'rate-form--loading' 
                            : ''
                        }
                    `}
                >
                    <Field 
                        className={`
                            rate-form__input 
                            ${
                                errors.name && touched.name 
                                ? 'rate-form__input--outline' 
                                : ''
                            }
                        `}
                        name="name"
                        placeholder="USD"
                        type="text"
                    />
                    <Field 
                        className={`
                            rate-form__input 
                            ${
                                errors.price_in_ua && touched.price_in_ua 
                                ? 'rate-form__input--outline' 
                                : ''
                            }
                        `}
                        name="price_in_ua"
                        placeholder="8"
                        type="text"
                        onChange={(e) => {
                            setFieldValue("price_in_ua", ConverIntoFloatNumber(e.target.value));
                        }}
                    />
                    <Field 
                        className={`
                            rate-form__input 
                            ${
                                errors.symbol && touched.symbol 
                                ? 'rate-form__input--outline' 
                                : ''
                            }
                        `}
                        name="symbol"
                        placeholder="$"
                        type="text"
                    />
                    <div className="rate-form__btns"
                    >
                        {/* { !isDeleteError &&
                            <button className={`rate-form__btn-delete ${
                                        isError ||
                                        cancel ||
                                        values.name != props.name || 
                                        values.price_in_ua != props.price_in_ua || 
                                        values.symbol != props.symbol 
                                        ? 'rate-form__btn--hidden'
                                        : ''
                                    }`}
                                    type="button"
                                    onClick={() => {
                                        deleteItem(props.id)
                                    }}
                            >
                                <BucketIcon/>
                            </button>
                        } */}
                        <button 
                            className={`
                                rate-form__btn-save 
                                ${setHiddenClass(isError, cancel, values, props)}
                            `}
                            type="submit"
                        >
                            <SaveIcon/>
                        </button>
                        <button 
                            className={`
                                rate-form__btn-cancel 
                                ${setHiddenClass(isError, cancel, values, props)}
                            `} 
                            onClick={() => {
                                if(cancel) {
                                    cancel();
                                } else {
                                    setValues({
                                        name,
                                        price_in_ua,
                                        symbol
                                    })
                                }
                            }}
                            type="button"
                        >
                            <DeleteIcon/>
                        </button>
                        { isError && <Error error={error}/> }
                    </div>
                </Form>
            )}
        </Formik>
    )
}