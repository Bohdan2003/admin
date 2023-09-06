import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useCreateStockItemMutation } from '../../api';
import { ConverIntoIntNumber, ConverIntoFloatNumber } from '../../utils/helper';
import { store } from "../../store";
import { useDispatch } from 'react-redux';
import { clearFilters } from '../filters/filtersSlice';
import { addItem, addItemForInfiniteScroll } from '../../utils/api';

import { Error } from '../error/Error';
import { InputImage } from '../inputImage/InputImage';
import { CurrencySelect } from '../currencySelect/CurrencySelect';
import { ReactComponent as SaveIcon } from "../../assets/save.svg"
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

import "./stockCreateItem.scss";

const setErrorClass = (error) => {
    if(error) { 
        return 'create-item__field--outline' 
    } else {
        return ''
    }       
}

const initialValues = {
    art: '',
    name: '',        
    quantity: '',        
    quantity_in_shop: '',        
    price: '',        
    retail: '',        
    opt: '',        
    min_quantity: '',        
    currency: ''    
};

export const StockCreateItem = ({page}) => { 
    const dispatch = useDispatch();

    const [ createStockItem, { isLoading, isError, error } ] = useCreateStockItemMutation();
    
    return (
        <Formik
            initialValues={initialValues}
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
            onSubmit={(values, { setFieldError, resetForm }) => { 
                const filters = store.getState().filters.stockAdd.values;
                if(!filters.category) {
                    setFieldError("filter_product", "Выбирете категорию")
                    setTimeout(() => {
                        setFieldError("filter_product", null);
                    }, 3000)
                } else if(!filters.subcategory) {
                    setFieldError("filter_product", "Выбирете подкатегорию")
                    setTimeout(() => {
                        setFieldError("filter_product", null);
                    }, 3000)
                } 
                else {
                    const formData = new FormData();        
                    for(let key in values){
                        if(values[key] == null) { continue }
                            
                        formData.append(key, values[key]);
                    } 

                    formData.append("filter_product", filters.subcategory);

                    createStockItem(formData).unwrap()
                        .then(res => {
                            resetForm();
                            dispatch(addItem('getLastAddedItems', res));
                            dispatch(clearFilters(page));
                        })
                        .catch(err => {
                            console.log(err);
                        }) 
                }
            }}
        >
            {({ values, errors, touched, setFieldValue, resetForm }) => (
                <Form 
                    className={`
                        create-item
                        ${
                            isLoading 
                            ? 'create-item--disabled'
                            : ''
                        }
                    `}
                >
                    <div className="create-item__art">
                        <div className="create-item__title">
                            Код
                        </div>
                        <Field 
                            className={`
                                create-item__input 
                                ${setErrorClass(errors.art && touched.art)}`
                            }
                            name="art" 
                            type="text"
                        />
                    </div>

                    <div className="create-item__name">
                        <div className="create-item__title">
                            Наименование
                        </div>
                        <Field 
                            className={`
                                create-item__input 
                                ${setErrorClass(errors.name && touched.name)}`
                            } 
                            name="name"
                            type="text"
                        />
                    </div>

                    <div className={`create-item__stock`}>
                        <div className="create-item__title">
                            Склад
                        </div>
                        <Field 
                            className={`
                                create-item__input 
                                ${setErrorClass(errors.quantity && touched.quantity)}`
                            }
                            name="quantity" 
                            type="text" 
                            onChange={(e) => {
                                setFieldValue("quantity", ConverIntoIntNumber(e.target.value));
                            }}
                        />
                    </div>

                    <div className={`create-item__store`}>
                        <div className="create-item__title">
                            Магазин
                        </div>
                        <Field 
                            className={`
                                create-item__input 
                                ${setErrorClass(errors.quantity_in_shop && touched.quantity_in_shop)}`
                            }
                            name="quantity_in_shop" 
                            type="text" 
                            onChange={(e) => {
                                setFieldValue("quantity_in_shop", ConverIntoIntNumber(e.target.value));
                            }}
                        />
                    </div>

                    <div className={`create-item__price`}>
                        <div className="create-item__title">
                            Закупка
                        </div>
                        <Field 
                            className={`create-item__input 
                                ${setErrorClass(errors.price && touched.price)}`
                            }
                            name="price" 
                            type="text" 
                            onChange={(e) => {
                                setFieldValue("price", ConverIntoFloatNumber(e.target.value));
                            }}
                        />
                    </div>

                    <div className={`create-item__retail`}>
                        <div className="create-item__title">
                            Розница
                        </div>
                        <Field 
                            className={`create-item__input 
                                ${setErrorClass(errors.retail && touched.retail)}`
                            }
                            name="retail" 
                            type="text" 
                            onChange={(e) => {
                                setFieldValue("retail", ConverIntoFloatNumber(e.target.value));
                            }}
                        />
                    </div>

                    <div className="create-item__opt">
                        <div className="create-item__title">
                            Опт
                        </div>
                        <Field 
                            className={`create-item__input 
                                ${setErrorClass(errors.opt && touched.opt)}`
                            }
                            name="opt" 
                            type="text" 
                            onChange={(e) => {
                                setFieldValue("opt", ConverIntoFloatNumber(e.target.value));
                            }}
                        />
                    </div>

                    <div className="create-item__images">
                        <div className="create-item__title">
                            Изображения
                        </div>
                        <div className="create-item__images-box">
                            <InputImage 
                                nameClass="create-item__image"
                                values={values} 
                                fieldName={'image1'}
                                setFieldValue={setFieldValue} 
                            />
                            <InputImage 
                                nameClass="create-item__image"
                                values={values} 
                                fieldName={'image2'}
                                setFieldValue={setFieldValue} 
                            />
                            <InputImage 
                                nameClass="create-item__image"
                                values={values} 
                                fieldName={'image3'}
                                setFieldValue={setFieldValue} 
                            />
                        </div>
                    </div>

                    <div 
                        className={`create-item__btns
                            ${
                                isError
                                // ? ''
                                ? 'create-item__btns--hidden'
                                : ''
                            }
                        `}
                    >
                        <button 
                            className="create-item__btn-save" 
                            type="submit"
                        ><SaveIcon/></button>
                        <button 
                            className="create-item__btn-cancel" 
                            type="button"
                            onClick={() => {
                                resetForm();
                            }}
                        ><DeleteIcon/></button>

                        { isError && <Error error={error}/> }
                    </div>

                    <div className="create-item__minimum">
                        <div className="create-item__title">
                            Мин. кол-во
                        </div>
                        <Field 
                            className={`
                                create-item__input 
                                ${setErrorClass(errors.min_quantity && touched.min_quantity)}`
                            }
                            name="min_quantity" 
                            type="text" 
                            onChange={(e) => {
                                setFieldValue("min_quantity", ConverIntoIntNumber(e.target.value));
                            }}
                        />
                    </div>              

                    <div className="create-item__currency">
                        <div className="create-item__title">
                            Валюта
                        </div>
                        <div 
                            className={`
                                create-item__select 
                                ${errors.currency && touched.currency ? 'create-item__select--outline' : ''}`
                            }
                        >
                            <CurrencySelect 
                                option={values.currency} 
                                setOption={(option) => {
                                    setFieldValue("currency", option)
                                }}
                            />
                        </div>
                    </div>
                    {errors.filter_product && <div className="error">{errors.filter_product}</div>}
                </Form>
            )}
        </Formik>
    )
}