import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showScroll } from "../../utils/helper";
import { Formik, Form, Field } from 'formik';
import { clearCart } from "./cartSlice";
import { resetPage } from "../infiniteScroll/infiniteScrollSlice";
import { useSaveCartMutation } from "../../api";

import { ReactComponent as ExitIcon } from "../../assets/arrow-exit.svg";
import { CartItem } from "../cartItem/CartItem"

import "./cart.scss";

export const Cart = memo(({cartRef}) => {
    const dispatch = useDispatch();
    const [ saveCart, { isLoading, isError, error } ] = useSaveCartMutation();
    const items = useSelector(state => state.cart.items);

    let total = 0;
    items.forEach(item => {
        if(item.total) 
            total = total + +item.total;
    });

    return (
        <section 
            className="cart"
            ref={cartRef}
            onClick={e => {
                if(e.target.classList.contains("cart")){
                    showScroll();
                    e.currentTarget.classList.remove("cart--visible")
                }
            }}
        >
            <div 
                className={`
                    cart__content 
                    ${
                        isLoading 
                        ? 'cart__content--loading' 
                        : ''
                    }
                `}
            >
                <div className="cart__top">
                    <div className="cart__title">Корзина</div>
                    <button 
                        className="cart__btn-exit"
                        onClick={() => {
                            showScroll();
                            cartRef.current.classList.remove("cart--visible")
                        }}
                    ><ExitIcon/></button>
                </div>
                <ul 
                    className={`
                        cart__list 
                        ${
                            isLoading 
                            ? 'cart__list--loading' 
                            : ''
                        }
                    `}
                >
                    {items.map(item => <CartItem props={item} key={item.id}/>)}
                </ul>
                {
                    items.length != 0
                    ? 
                    <Formik
                        initialValues={{ name: '' }}
                        onSubmit={(values) => {
                            const product = items.map(item => ({
                                art: item.art, 
                                name: item.name, 
                                quantity: item.quantity, 
                                price: item.price, 
                                currency: item.currency, 
                                buy_price: item.buy_price, 
                                total: item.total,
                                filter_id: item.filter_product
                            }))
                            
                            dispatch(resetPage('store'));
                            
                            saveCart({
                                name: values.name,
                                product
                            }).unwrap()
                            .then(() => {                               
                                dispatch(clearCart());
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                        }}
                    >
                        <Form 
                            className={`
                                cart__bottom-form
                                ${
                                    isLoading 
                                    ? 'cart__bottom-form--loading' 
                                    : ''
                                }
                            `}
                        >
                            <div className="cart__bottom-title">Итого</div>
                            <div className="cart__initial">
                                <div className="cart__initial-title">
                                    Инициалы
                                </div>
                                <Field 
                                    className="cart__initial-input" 
                                    type="text"
                                    name="name"
                                />
                            </div>
                            <div className="cart__bottom-total">
                                {total.toFixed(2)}
                            </div>
                            <button 
                                className="cart__btn-submit" 
                                type="submit"
                            >Оформить</button>
                            {
                                isError &&
                                <div className="cart__error error"> {error?.status || 'error'} </div> 
                            }
                        </Form>
                    </Formik>
                    : ''
                }
            </div>
        </section>
    )
})