import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetStoreItemsQuery } from "../../api";
import { addItemToCart, removeItemToCart } from "../cart/cartSlice";
import { setFiltersForRequest } from "../../utils/helper";

import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";
import { ReactComponent as CartIcon } from "../../assets/cart-btn.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { Images } from "../images/Images";

import "./storeTable.scss";

const TableItemBtn = ({props}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(store => store.cart.items);
    
    if(cartItems && cartItems.findIndex(item => item.id == props.id) != -1) {
        return (
            <button className="store-table__btn-delete"
                    onClick={() => {
                        dispatch(removeItemToCart(props.id))
                    }}
            ><DeleteIcon/></button>
        )
    } else {
        return (
            <button className="store-table__btn-add"
                    onClick={() => {
                        dispatch(addItemToCart(props))       
                    }}
            ><CartIcon/></button>
        )
    }
}

const TableItem = memo(({props}) => {
    const {art, name, quantity, quantity_in_shop, opt, retail, image1, image2, image3, id } = props;

    return (
        <tr key={id}>
            <td width={200}>{art}</td>
            <td width={600}>{name}</td>
            <td width={100}>{quantity}</td>
            <td width={100}>{quantity_in_shop}</td>
            <td width={100}>{retail}</td>
            <td width={100}>{opt}</td>
            <td>
                <Images img1={image1} img2={image2} img3={image3}/>
            </td>
            <td>
                <TableItemBtn props={props}/>               
            </td>
        </tr>
    )
})

export const StoreTable = memo(({ page }) => {
    const filters = useSelector(state => state.filters[page].values);
    const { data = [], isLoading, isError, error } = useGetStoreItemsQuery(filters);

    const setContent = () => {
        if(isLoading) return <Loading/>;
        if(isError) return <Error error={error}/>;

        return (
            <table>
                <thead>
                    <tr>
                        <th>Код</th>
                        <th>Наименование</th>
                        <th>Склад</th>
                        <th>Магазин</th>
                        <th>Розница</th>
                        <th>Опт</th>
                        <th>Изображение</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => <TableItem props={item} key={item.id}/>)
                    } 
                </tbody>
            </table>
        )
    }
    
    const table = setContent()

    return (
        <div className="store-table">
            {table}
        </div>
    )
})