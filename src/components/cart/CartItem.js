import { memo, useRef } from "react";
import { removeItemToCart, editItemToCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as SaveIcon } from "../../assets/save.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/minus.svg";
import { Images } from "../images/Images";

export const CartItem = memo(({props}) => {

    const dispatch = useDispatch();
    const {art, name, quantity, quantity_in_shop, opt, retail, image1, image2, image3, id } = props;
    const factorRef = useRef(+opt);
    const factorNameRef = useRef("Опт");

    const totalCount = (amount, setFieldValue) => {
        setFieldValue("total", +factorRef.current * amount)
    }

    return (
        <li className="cart__item">
            <button className="cart__btn-delete"
                    onClick={() => {
                        dispatch(removeItemToCart(id))
                    }}
            ><DeleteIcon/></button>
            <Images img1={image1} img2={image2} img3={image3}/>
            <div className="cart__cod">{art}</div>
            <div className="cart__name">{name}</div>
            <Formik
                initialValues={{ opt, retail, amount: 1, total: opt * 1 }}
                validationSchema={yup.object({
                    amount: yup.number()
                            .required("Обязательое поле"),
                    total: yup.number()
                            .required("Обязательое поле")
                })}
                onSubmit={(values) => {
                    console.log({'art': '632296', 'name': 'abobus', 'quantity': '12', 'price': 12, 'currency': 'UAH', 'buy_price': 100, 'total': 100})
                    // console.log({...props});
                    console.log({art, currency: props.currency, price: factorRef.current, name, buy_price: props.price, quantity: values.amount, total: values.total });
                    // editItemToCart({...props});      
                }}
            >
                {({ values, setFieldValue, resetForm }) => (
                    <Form className="cart__form">
                        <div className="cart__field">
                            <div className="cart__field-title">На складе</div>
                            <div className="cart__field-value">{quantity}</div>
                        </div>
                        <div className="cart__field">
                            <div className="cart__field-title">В магазине</div>
                            <div className="cart__field-value">{quantity_in_shop}</div>
                        </div>
                        <div className="cart__field">
                            <button className={`cart__field-button ${factorNameRef.current == "Опт" ? "cart__field-button--active" : ""}`}
                                 onClick={() => {
                                    factorRef.current = values.opt;
                                    factorNameRef.current = "Опт";
                                    totalCount(values.amount, setFieldValue);
                                 }}
                                 type="button"
                            >Опт</button>
                            <Field className="cart__field-input" 
                                    type="text"
                                    name="opt"
                                    onChange={(e) => {
                                        const inputValue = +e.target.value.replace(/[^\d.]/g, '');
                                        setFieldValue("opt", inputValue);
                                        factorRef.current = inputValue;
                                        totalCount(values.amount, setFieldValue);
                                    }}
                            />
                        </div>                    
                        <div className="cart__field">
                            <button className={`cart__field-button ${factorNameRef.current == "Розница" ? "cart__field-button--active" : ""}`}
                                 onClick={() => {
                                    factorNameRef.current = "Розница";
                                    factorRef.current = values.retail;
                                    totalCount(values.amount, setFieldValue);
                                 }}
                                 type="button"
                            >Розница</button>
                            <Field className="cart__field-input" 
                                    type="text"
                                    name="retail"
                                    onChange={(e) => {
                                        const inputValue = +e.target.value.replace(/[^\d.]/g, '');
                                        setFieldValue("retail", inputValue);
                                        factorRef.current = inputValue;
                                        totalCount(values.amount, setFieldValue);
                                    }}
                            />
                        </div>
                        <div className={`cart__btns ${JSON.stringify(values) != JSON.stringify({opt, retail, amount: 1, total: opt * 1}) ? "cart__btns--visible" : ""}`}>
                            <button className="cart__btn-save" type="submit"><SaveIcon/></button>
                            <button className="cart__btn-cancel" 
                                    type="button"
                                    onClick={() => {
                                        resetForm()
                                    }} 
                            ><DeleteIcon/></button>
                        </div>
                        <div className="cart__amount">
                            <button className="cart__amount-btn" 
                                    type="button"
                                    onClick={() => {
                                        if(values.amount > 1) {
                                            setFieldValue("amount", +values.amount - 1);
                                            totalCount(+values.amount - 1, setFieldValue);
                                        }
                                    }}
                            ><MinusIcon/></button>
                            <Field className="cart__amount-input" 
                                type="text"
                                name="amount"
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(/[^\d]/g, '');
                                    if(inputValue <= quantity && inputValue > 0){
                                        setFieldValue("amount", inputValue);
                                        totalCount(+e.target.value.replace(/[^\d]/g, ''), setFieldValue);
                                    }
                                }}
                            />
                            <button className="cart__amount-btn" 
                                    type="button"
                                    onClick={() => {
                                        if(+values.amount + 1 <= quantity){     
                                            setFieldValue("amount", +values.amount + 1);
                                            totalCount(+values.amount + 1, setFieldValue);
                                        }
                                    }}
                            ><PlusIcon/></button>
                        </div>
                        <Field className="cart__total-input" 
                                type="text"
                                name="total"
                                onChange={(e) => {
                                    setFieldValue("total", e.target.value.replace(/[^\d.]/g, ''));
                                }}
                        />
                    </Form>
                )}
            </Formik>
        </li>
    )
})