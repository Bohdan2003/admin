import { memo } from "react";
import { removeItemToCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { Images } from "../images/Images";

export const CartItem = memo(({props}) => {

    const dispatch = useDispatch();
    const {art, name, quantity, quantity_in_shop, opt, retail, image1, image2, image3, id } = props;

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
                initialValues={{ username: '', password: '' }}
                validationSchema={yup.object({
                    username: yup.string()
                            .required("Обязательое поле"),
                    password: yup.string()
                            .required("Обязательое поле")
                })}
                onSubmit={(values) => {
                    console.log(values);       
                }}
            >
                <Form className="cart__form">
                    <div className="cart__stock">
                        <div className="cart__stock-text">На складе</div>
                        <div className="cart__stock-value">{quantity}</div>
                    </div>
                    <div className="cart__store">
                        <div className="cart__store-text">В магазине</div>
                        <div className="cart__store-value">{quantity_in_shop}</div>
                    </div>
                    <div className="cart__wholesale">
                        <div className="cart__wholesale-text">Опт</div>
                        <div className="cart__wholesale-value">{opt}</div>
                    </div>                    
                    <div className="cart__retail">
                        <div className="cart__retail-text">Розница</div>
                        <div className="cart__retail-value">{retail}</div>
                    </div>
                    <div className="cart__btns">
                        <button className="cart__btn-save"></button>
                        <input className="cart__btn-cancel" type="button"/>
                    </div>
                    <input type="text" className="cart_amunt"/>
                    <input type="text" className="cart_total"/>
                </Form>
            </Formik>
        </li>
    )
})