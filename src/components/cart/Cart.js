import { memo } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useSelector } from "react-redux";
import { showScroll } from "../../utils/helper";
import { ReactComponent as ExitIcon } from "../../assets/arrow-exit.svg";
import { Img } from "../img/Img";

import "./cart.scss";

const CartItem = memo(({props}) => {

    const {cod, name, onStock, purchase, retail, wholesale, images, id} = props;

    return (
        <li className="cart__item">
            <div className="cart__images">
                {images.map((img, i) => (
                    <Img src={img} key={i}/>
                ))}
            </div>
            <div className="cart__cod">{cod}</div>
            <div className="cart__name">{name}</div>
            <div className="cart__box">
                <div className="cart__stock">{onStock}</div>
                <div className="cart__purchase">{purchase}</div>
                <div className="cart__retail">{retail}</div>
                <div className="cart__wholesale">{wholesale}</div>
            </div>
        </li>
    )
})

export const Cart = ({cartRef}) => {

    const items = useSelector(state => state.cart.items);

    return (
        <section className="cart" 
                 ref={cartRef}
                 onClick={e => {
                    if(e.target.classList.contains("cart")){
                        showScroll();
                        e.currentTarget.classList.remove("cart--visible")
                    }
                 }}>
            <div className="cart__content">
                <div className="cart__top">
                    <div className="cart__title">Корзина</div>
                    <button className="cart__btn-exit"
                            onClick={() => {
                                showScroll();
                                cartRef.current.classList.remove("cart--visible")
                            }}
                    ><ExitIcon/></button>
                </div>
                <ul className="cart__list">

                </ul>
                <div className="cart__bottom">
                    {items.map(item => <CartItem props={item} key={item.id}/>)}
                </div>
            </div>
        </section>
    )
}