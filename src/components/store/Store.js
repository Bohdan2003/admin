import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetStoreItemsMutation } from "../../api";
import { hiddenScroll } from "../../utils/helper";

import { FiltersMenu } from "../filters/FIltersMenu";
import { Filters } from "../filters/Filters";
import { StoreTableItem } from "./StoreTableItem";
import { Cart } from "../cart/Cart";

import "./store.scss";

const Store = () => {

    const [ getData, { data = [], isLoading } ] = useGetStoreItemsMutation()
    const cartRef = useRef();
    const filtersRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        getData()
    }, [])

    const setContent = () => {
        if(isLoading) return <tr><td>loading...</td></tr>

        // console.log(data);
        return data.map(item => <StoreTableItem props={item} dispatch={dispatch} key={item.id}/>)
    }

    const content = setContent();

    return (
        <>
            <section className="store">
                <div className="store__top">                   
                    <div className="store__head">
                        <FiltersMenu filtersRef={filtersRef}/>
                        <button className="store__cart" 
                                onClick={() => {
                                    hiddenScroll();
                                    cartRef.current.classList.add("cart--visible");
                                }}
                        >Корзина</button>
                    </div>                 
                    <Filters filtersRef={filtersRef}/>  
                </div>
                <table className="store__table">
                    <thead>
                        <tr>
                            <th>Код</th>
                            <th>Наименование</th>
                            <th>Склад</th>
                            <th>Магазин</th>
                            <th>Розница</th>
                            <th>Опт</th>
                            <th>Изображение</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}  
                    </tbody>
                </table>
            </section>
            <Cart cartRef={cartRef}/>
        </>
    )
}

export default Store