import { useRef, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useGetStoreItemsMutation } from "../../api";
import { hiddenScroll } from "../../utils/helper";

import { Error } from "../error/Error";
import { FiltersMenu } from "../filters/FIltersMenu";
import { Filters } from "../filters/Filters";
import { StoreTableItem } from "./StoreTableItem";
import { Cart } from "../cart/Cart";

import "./store.scss";

const Store = () => {

    const filters = useSelector(state => state.filters.store.params);
    const [ getData, { data = [], isLoading, isError, error } ] = useGetStoreItemsMutation();
    const cartRef = useRef();
    const filtersRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        getData(filters)
    }, [filters])

    const setContent = () => {
        if(isLoading) return <tr><td>loading...</td></tr>
        if(isError) return <tr><td><Error error={error}/></td></tr>

        return data.map(item => <StoreTableItem props={item} dispatch={dispatch} key={item.id}/>)
    }

    const content = setContent();

    return (
        <>
            <section className="store">
                <div className="store__top">                   
                    <div className="store__head">
                        <FiltersMenu page={'store'} filtersRef={filtersRef}/>
                        <button className="store__cart" 
                                onClick={() => {
                                    hiddenScroll();
                                    cartRef.current.classList.add("cart--visible");
                                }}
                        >Корзина</button>
                    </div>                 
                    <Filters page={'store'} filtersRef={filtersRef}/>  
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