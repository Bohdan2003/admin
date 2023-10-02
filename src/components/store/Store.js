import { useRef, useEffect } from "react";
import { hiddenScroll } from "../../utils/helper";

import { FiltersMenu } from "../filterMenu/FIltersMenu";
import { Filters } from "../filters/Filters";
import { StoreTable } from "../storeTable/StoreTable";
import { Cart } from "../cart/Cart";

import "./store.scss";

const page = 'store';

const Store = () => {    
    const cartRef = useRef();
    const filtersRef = useRef();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <>
            <section className="store">
                <div className="store__top">
                    <div className="store__head">
                        <FiltersMenu page={page} filtersRef={filtersRef}/>
                        <button className="store__cart" 
                                onClick={() => {
                                    hiddenScroll();
                                    cartRef.current.classList.add("cart--visible");
                                }}
                        >Корзина</button>
                    </div>                 
                    <Filters page={page} filtersRef={filtersRef}/> 
                </div>
                <StoreTable page={page}/> 
            </section>
            <Cart cartRef={cartRef}/>
        </>
    )
}

export default Store