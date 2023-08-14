import { memo, useRef } from "react";
import { removeItemToCart, editItemToCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { ConverIntoIntNumber, ConverIntoFloatNumber } from "../../utils/helper";

import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as SaveIcon } from "../../assets/save.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/minus.svg";
import { Images } from "../images/Images";

export const CartItem = memo(({props}) => {
    const dispatch = useDispatch();
    const {art, name, quantity_in_stock, quantity_in_shop, quantity, opt, retail, total, image1, image2, image3, id } = props;
    const factorRef = useRef(+opt);
    const factorNameRef = useRef("Опт");

    const totalCount = (quantity, setFieldValue) => {
        setFieldValue("total", +factorRef.current * quantity)
    }

    return (
        <li className="cart__item">
            <button 
                className="cart__btn-delete"
                onClick={() => {
                    dispatch(removeItemToCart(id))
                }}
            ><DeleteIcon/></button>
            <Images 
                img1={image1} 
                img2={image2} 
                img3={image3} 
                noHiddenScroll
            />
            <div className="cart__cod">{art}</div>
            <div className="cart__name">{name}</div>
            <Formik
                initialValues={{ opt, retail, quantity, total }}
                validationSchema={yup.object({
                    opt: yup.number()
                            .min(0.00001, true)
                            .required(true),
                    retail: yup.number()
                            .min(0.00001, true)
                            .required(true),
                    quantity: yup.number()
                            .min(0.00001, true)
                            .required(true),
                    total: yup.number()
                            .min(0.00001, true)
                            .required(true)
                })}
                onSubmit={(values) => {
                    dispatch(editItemToCart({
                        opt: +values.opt,
                        retail: +values.retail,
                        quantity: +values.quantity, 
                        price: +factorRef.current, 
                        total: +values.total,
                        id 
                    }));      
                }}
            >
                {({ values, errors, touched, setFieldValue, setValues }) => (
                    <Form className="cart__form">
                        <div className="cart__field">
                            <div className="cart__field-title">На складе</div>
                            <div className="cart__field-value">{quantity_in_stock}</div>
                        </div>
                        <div className="cart__field">
                            <div className="cart__field-title">В магазине</div>
                            <div className="cart__field-value">{quantity_in_shop}</div>
                        </div>
                        <div className="cart__field">
                            <button 
                                className={`cart__field-button 
                                ${
                                    factorNameRef.current == "Опт" 
                                    ? "cart__field-button--active" 
                                    : ""
                                }`}
                                 onClick={() => {
                                    factorRef.current = values.opt;
                                    factorNameRef.current = "Опт";
                                    totalCount(values.quantity, setFieldValue);
                                 }}
                                 type="button"
                            >Опт</button>
                            <Field 
                                className={`cart__field-input 
                                ${
                                    errors.opt && touched.opt 
                                    ? 'cart__field-input--outline' 
                                    : ''
                                }`} 
                                type="text"
                                name="opt"
                                onChange={(e) => {
                                    let inputValue = ConverIntoFloatNumber(e.target.value);
                                    setFieldValue("opt", inputValue);
                                    factorRef.current = inputValue;
                                    totalCount(values.quantity, setFieldValue);                                       
                                }}
                            />
                        </div>                    
                        <div className="cart__field">
                            <button 
                                className={`cart__field-button 
                                ${
                                    factorNameRef.current == "Розница" 
                                    ? "cart__field-button--active" 
                                    : ""
                                }`}
                                onClick={() => {
                                    factorNameRef.current = "Розница";
                                    factorRef.current = values.retail;
                                    totalCount(values.quantity, setFieldValue);
                                }}
                                type="button"
                            >Розница</button>
                            <Field 
                                className={`cart__field-input 
                                ${
                                    errors.retail && touched.retail 
                                    ? 'cart__field-input--outline' 
                                    : ''
                                }`}  
                                type="text"
                                name="retail"
                                onChange={(e) => {
                                    let inputValue = ConverIntoFloatNumber(e.target.value);
                                    setFieldValue("retail", inputValue);
                                    factorRef.current = inputValue;
                                    totalCount(values.quantity, setFieldValue);
                                }}
                            />
                        </div>
                        {/* ${JSON.stringify({ opt: values.opt, retail: values.retail, quantity: values.quantity, total: values.total })}    
                        ${JSON.stringify({ opt, retail, quantity, total })}     */}
                        <div className={`cart__btns     
                            ${
                                JSON.stringify({ 
                                    opt: +values.opt, 
                                    retail: +values.retail, 
                                    quantity: +values.quantity, 
                                    total: +values.total 
                                }) 
                                    != 
                                JSON.stringify({
                                    opt: +opt, 
                                    retail: +retail, 
                                    quantity: +quantity, 
                                    total: +total
                                }) 
                                ? "cart__btns--visible" 
                                : ""
                            }`
                        }>
                            <button 
                                className="cart__btn-save" 
                                type="submit"
                            ><SaveIcon/></button>
                            <button 
                                className="cart__btn-cancel" 
                                type="button"
                                onClick={() => {
                                    setValues({
                                        opt, 
                                        retail, 
                                        quantity, 
                                        total 
                                    })
                                }} 
                            ><DeleteIcon/></button>
                        </div>
                        <div className="cart__amount">
                            <button 
                                className="cart__amount-btn" 
                                type="button"
                                onClick={() => {
                                    if(values.quantity > 1) {
                                        setFieldValue("quantity", +values.quantity - 1);
                                        totalCount(+values.quantity - 1, setFieldValue);
                                    }
                                }}
                            ><MinusIcon/></button>
                            <Field 
                                className={`cart__amount-input 
                                ${
                                    errors.quantity && touched.quantity 
                                    ? 'cart__amount-input--outline' 
                                    : ''
                                }`} 
                                type="text"
                                name="quantity"
                                onChange={(e) => {
                                    const inputValue = ConverIntoIntNumber(e.target.value);
                                    if(inputValue <= quantity_in_stock && inputValue > 0){
                                        setFieldValue("quantity", inputValue);
                                        totalCount(+e.target.value.replace(/[^\d]/g, ''), setFieldValue);
                                    }
                                }}
                            />
                            <button 
                                className="cart__amount-btn" 
                                type="button"
                                onClick={() => {
                                    if(+values.quantity + 1 <= quantity_in_stock){     
                                        setFieldValue("quantity", +values.quantity + 1);
                                        totalCount(+values.quantity + 1, setFieldValue);
                                    }
                                }}
                            ><PlusIcon/></button>
                        </div>
                        <Field className={`cart__total-input ${errors.total && touched.total ? 'cart__total-input--outline' : ''}`} 
                                type="text"
                                name="total"
                                onChange={(e) => {
                                    // console.log( JSON.stringify({ 
                                    //     opt: +values.opt, 
                                    //     retail: +values.retail, 
                                    //     quantity: +values.quantity, 
                                    //     total: +values.total 
                                    // }) );
                                    // console.log(JSON.stringify({
                                    //     opt: +opt, 
                                    //     retail: +retail, 
                                    //     quantity: +quantity, 
                                    //     total: +total
                                    // }) );
                                    setFieldValue("total",  ConverIntoFloatNumber(e.target.value));
                                }}
                        />
                    </Form>
                )}
            </Formik>
        </li>
    )
})