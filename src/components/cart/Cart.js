import { useSelector } from "react-redux";
import { showScroll } from "../../utils/helper";

import { ReactComponent as ExitIcon } from "../../assets/arrow-exit.svg";
import { CartItem } from "./CartItem";

import "./cart.scss";

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
                <span></span>
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