import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useEditStockItemMutation, useDeleteStockItemMutation } from '../../api';
import { ConverIntoIntNumber, ConverIntoFloatNumber } from '../../utils/helper';

import { Error } from '../error/Error';
import { InputImage } from '../inputImage/InputImage';
import { CurrencySelect } from '../currencySelect/CurrencySelect';
import { ReactComponent as SaveIcon } from "../../assets/save.svg"
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

import "./stockTableEditItem.scss";

const setErrorClass = (error) => {
    if(error) { 
        return 'edit-item__field--outline' 
    } else {
        return ''
    }       
}

export const StockTableEditItem = ({ 
    props = {
        art: '',
        name: '',        
        quantity: '',        
        quantity_in_shop: '',        
        price: '',        
        retail: '',        
        opt: '',        
        min_quantity: '',        
        currency: '',        
    }, 
    saveChange, 
    hiddenItem, 
    cancel
}) => {   
    const [ editStockItem, { isLoading: isLoadingEditing, isError: isEditError, error: errorEditing } ] = useEditStockItemMutation();
    const [ deleteStockItem, { isLoading: isLoadingDeleting, isError: isDeleteError, error: errorDeleting } ] = useDeleteStockItemMutation();

    return (
        <Formik
            initialValues={{...props}}
            validationSchema={yup.object({
                // art
                art: yup.string()
                        .required(true),
                // name
                name: yup.string()
                        .min(3, true)
                        .required(true),
                // stock
                quantity: yup.number()
                        .required(true),
                //store
                quantity_in_shop: yup.number()
                        .required(true),
                //price
                price: yup.string()
                        .min(0.00001, true)
                        .required(true),
                //retail
                retail: yup.string()
                        .min(0.00001, true)
                        .required(true),
                //opt
                opt: yup.string()
                        .min(0.00001, true)
                        .required(true),
                //minimum
                min_quantity: yup.number()
                        .required(true),
                //currency
                currency: yup.string()
                        .required(true)
            })}
            onSubmit={(values) => {
                const formData = new FormData();        
                for(let key in values){
                    if( 
                        values[key] == null ||
                        key.includes("image") && typeof(values[key]) == "string"
                        ) { continue }
                        
                    formData.append(key, values[key]);
                } 
                editStockItem({id: props.id, body: formData}).unwrap()
                .then(res => {
                    saveChange(res)
                })
                .catch(err => {
                    console.log(err);
                }) 
            }}
        >
            {({ values, errors, touched, setFieldValue, resetForm }) => (
                <Form className={`edit-item
                    ${
                        isLoadingEditing ||
                        isLoadingDeleting
                        ? 'edit-item--disabled'
                        : ''
                    }
                    `}
                >
                    <div className={`edit-item__art`}>
                        <div className="edit-item__title">
                            Код
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.art && touched.art)}`}
                                    name="art" 
                                    type="text"
                        />
                    </div>

                    <div className="edit-item__name">
                        <div className="edit-item__title">
                            Наименование
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.name && touched.name)}`} 
                                name="name"
                                type="text"
                        />
                    </div>

                    <div className={`edit-item__stock`}>
                        <div className="edit-item__title">
                            Склад
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.quantity && touched.quantity)}`}
                                    name="quantity" 
                                    type="text" 
                                    onChange={(e) => {
                                    setFieldValue("quantity", ConverIntoIntNumber(e.target.value));
                                }}
                        />
                    </div>

                    <div className={`edit-item__store`}>
                        <div className="edit-item__title">
                            Магазин
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.quantity_in_shop && touched.quantity_in_shop)}`}
                                    name="quantity_in_shop" 
                                    type="text" 
                                    onChange={(e) => {
                                    setFieldValue("quantity_in_shop", ConverIntoIntNumber(e.target.value));
                                }}
                        />
                    </div>

                    <div className={`edit-item__price`}>
                        <div className="edit-item__title">
                            Закупка
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.price && touched.price)}`}
                                    name="price" 
                                    type="text" 
                                    onChange={(e) => {
                                    setFieldValue("price", ConverIntoFloatNumber(e.target.value));
                                }}
                        />
                    </div>

                    <div className={`edit-item__retail`}>
                        <div className="edit-item__title">
                            Розница
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.retail && touched.retail)}`}
                                    name="retail" 
                                    type="text" 
                                    onChange={(e) => {
                                    setFieldValue("retail", ConverIntoFloatNumber(e.target.value));
                                }}
                        />
                    </div>

                    <div className={`edit-item__opt`}>
                        <div className="edit-item__title">
                            Опт
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.opt && touched.opt)}`}
                                    name="opt" 
                                    type="text" 
                                    onChange={(e) => {
                                    setFieldValue("opt", ConverIntoFloatNumber(e.target.value));
                                }}
                        />
                    </div>

                    <div className="edit-item__images">
                        <div className="edit-item__title">
                            Изображения
                        </div>
                        <div className="edit-item__images-box">
                            <InputImage nameClass="create-item__image"
                                        values={values} 
                                        setFieldValue={setFieldValue} 
                                        fieldName={'image1'}
                                        defaultImg={props.image1}
                            />
                            <InputImage nameClass="create-item__image"
                                        values={values} 
                                        setFieldValue={setFieldValue} 
                                        fieldName={'image2'}
                                        defaultImg={props.image2}
                            />
                            <InputImage nameClass="create-item__image"
                                        values={values} 
                                        setFieldValue={setFieldValue} 
                                        fieldName={'image3'}
                                        defaultImg={props.image3}
                            />
                        </div>
                    </div>

                    <div className={`edit-item__btns
                            ${
                                isEditError || isDeleteError
                                ? 'edit-item__btns--hidden'
                                : ''
                            }
                        `}
                    >
                        <button className="edit-item__btn-save" 
                                type="submit"
                        ><SaveIcon/></button>
                        <button className="edit-item__btn-cancel" 
                                type="button"
                                onClick={() => {
                                    if(cancel) {
                                        cancel();
                                    } else {
                                        resetForm();
                                    }
                                }}
                        ><DeleteIcon/></button>

                        { isEditError && <Error error={errorEditing}/> }
                        { isDeleteError && <Error error={errorDeleting}/> }
                    </div>

                    <button className={`edit-item__btn-delete
                                ${
                                    isEditError || isDeleteError
                                    ? 'edit-item__btn-delete--hidden'
                                    : ''
                                }
                            `}
                            type="button"
                            onClick={() => {
                                deleteStockItem(props.id).unwrap()
                                    .then(() => {
                                        hiddenItem(true); 
                                    });
                            }}                            
                    >Удалить товар</button>

                    <div className="edit-item__minimum">
                        <div className="edit-item__title">
                            Мин. кол-во
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.min_quantity && touched.min_quantity)}`}
                                    name="min_quantity" 
                                    type="text" 
                                    onChange={(e) => {
                                    setFieldValue("min_quantity", ConverIntoIntNumber(e.target.value));
                                }}
                        />
                    </div>              

                    <div className="edit-item__currency">
                        <div className="edit-item__title">
                            Валюта
                        </div>
                        <CurrencySelect option={values.currency} 
                                        setOption={(option) => {
                                            setFieldValue("currency", option)
                                        }}
                        />
                    </div>

                    <div className="edit-item__preprice">
                        <div className="edit-item__title">
                            Пред. цена
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.previous_price && touched.previous_price)}`}
                                    name="previous_price" 
                                    type="text" 
                                    onChange={(e) => {
                                    setFieldValue("previous_price", ConverIntoFloatNumber(e.target.value));
                                }}
                        />
                    </div> 

                    <div className={`edit-item__prequantity`}>
                        <div className="edit-item__title">
                            Пред. кол-во
                        </div>
                        <Field className={`edit-item__input ${setErrorClass(errors.previous_quantity && touched.previous_quantity)}`}
                                    name="previous_quantity" 
                                    type="text" 
                                    onChange={(e) => {
                                    setFieldValue("previous_quantity", ConverIntoIntNumber(e.target.value));
                                }}
                        />
                    </div> 
                </Form>
            )}
        </Formik>
    )
}