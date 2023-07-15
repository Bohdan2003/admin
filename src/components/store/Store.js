import { memo, useRef, useEffect } from "react";
import { ReactComponent as CartIcon } from "../../assets/cart-btn.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { useDispatch } from "react-redux";
import { store } from "../../store"
import { addItemToCart, removeItemToCart } from "../cart/cartSlice";
import { useGetStoreItemsMutation } from "../../api";
import { hiddenScroll } from "../../utils/helper";
import { Cart } from "../cart/Cart";
import { Img } from "../img/Img";

import "./store.scss";

// const data = [
//     {
//         cod: 2118210000000,
//         name: "Поворотно-відкідний механізм  NX variable D15 на висоті 2001-2400 (4E) ручка 1001-1200 мм.",
//         onStock: 140,
//         purchase: 15,
//         retail: 1.20,
//         wholesale: 1.20,
//         images: [
//             `https://www.korsa.ua/sites/default/files/colorw_0004_0.jpg`,
//             `https://www.korsa.ua/sites/default/files/colorw_0004_0.jpg`,
//             `https://www.korsa.ua/sites/default/files/colorw_0004_0.jpg`
//         ],
//         id: 1
        
//     },
//     {
//         cod: 2118210000000,
//         name: "Поворотно-відкідний механізм  NX variable D15 на висоті 2001-2400 (4E) ручка 1001-1200 мм.",
//         onStock: 140,
//         purchase: 15,
//         retail: 1.20,
//         wholesale: 1.20,
//         images: [
//             `https://www.korsa.ua/sites/default/files/colorw_0004_0.jpg`,
//             `https://www.korsa.ua/sites/default/files/colorw_0004_0.jpg`,
//         ],
//         id: 2
        
//     },
//     {
//         cod: 2118210000000,
//         name: "Поворотно-відкідний механізм  NX variable D15 на висоті 2001-2400 (4E) ручка 1001-1200 мм.",
//         onStock: 140,
//         purchase: 15,
//         retail: 1.20,
//         wholesale: 1.20,
//         images: [
//             `https://www.korsa.ua/sites/default/files/colorw_0004_0.jpg`,
//             `https://www.korsa.ua/sites/default/files/colorw_0004_0.jpg`,
//             `https://www.korsa.ua/sites/default/files/colorw_0004_0.jpg`
//         ],
//         id: 3       
//     },
// ]

const StoreTableItem = memo(({props, dispatch}) => {

    const {art, name, onStock, purchase, retail, opt, images, id} = props;
    
    useEffect(() => {
        const cartItems = store.getState().cart.items;

        if(cartItems && cartItems.findIndex(item => item.id == id) >= 0){ 
            document.querySelector(`#store__row-${id} .store__btn-delete`).classList.remove("store__btn-delete--hidden")
            document.querySelector(`#store__row-${id} .store__btn-add`).classList.add("store__btn-add--hidden")
        }
    })


    return (
        <tr key={id} id={"store__row-"+ id}>
            <td>{art}</td>
            <td>{name}</td>
            <td>{onStock}</td>
            <td>{purchase}</td>
            <td>{retail}</td>
            <td>{opt}</td>
            <td>
                {images.map((img, i) => (
                    <Img src={img} key={i}/>
                ))}
            </td>
            <td>
                <button className="store__btn-add"
                        onClick={() => {
                            dispatch(addItemToCart(props))       
                        }}
                ><CartIcon/></button>
                <button className="store__btn-delete store__btn-delete--hidden"
                        onClick={() => {
                            dispatch(removeItemToCart(id))
                        }}
                ><DeleteIcon/></button>
            </td>
        </tr>
    )
})

const Store = () => {

    const [ getData, { data = [], isLoading } ] = useGetStoreItemsMutation()
    const cartRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        getData()
    }, [])

    const setContent = () => {
        if(isLoading) return <tr><td>loading...</td></tr>

        console.log(data);
        // return data.map(item => <StoreTableItem props={item} dispatch={dispatch} key={item.id}/>)
    }

    const content = setContent();

    return (
        <>
            <section className="store">
                <div className="store__top">
                    <div className="store__box">
                        <button className="store__btn-filter">Фильтр</button>
                        <button className="store__btn-clear">Сбросить*</button>
                        <div className="store__input-wrapper">
                            <input className="store__input" type="text" placeholder="Найти..."/>
                        </div>
                    </div>
                    <button className="store__cart" 
                            onClick={() => {
                                hiddenScroll();
                                cartRef.current.classList.add("cart--visible");
                            }}
                    >Корзина</button>
                </div>
                <table className="store__table">
                    <thead>
                        <tr>
                            <th>Код</th>
                            <th>Наименование</th>
                            <th>На складе</th>
                            <th>Закупка</th>
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