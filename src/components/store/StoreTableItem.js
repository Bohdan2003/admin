import { memo, useEffect } from "react";
import { addItemToCart, removeItemToCart } from "../cart/cartSlice";
import { store } from "../../store"

import { ReactComponent as CartIcon } from "../../assets/cart-btn.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { Images } from "../images/Images";

export const StoreTableItem = memo(({props, dispatch}) => {

    const {art, name, quantity, quantity_in_shop, opt, retail, image1, image2, image3, id } = props;
    
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
            <td>{quantity}</td>
            <td>{quantity_in_shop}</td>
            <td>{retail}</td>
            <td>{opt}</td>
            <td>
                <Images img1={image1} img2={image2} img3={image3}/>
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