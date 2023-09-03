import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetStoreItemsQuery } from "../../api";
import { addItemToCart, removeItemToCart } from "../cart/cartSlice";

import { InfiniteScroll } from "../infiniteScroll/InfiniteScroll";
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
    const {
        art, 
        name, 
        quantity, 
        quantity_in_shop, 
        opt, 
        retail, 
        image1, 
        image2, 
        image3, 
        id 
    } = props;

    return (
        <tr key={id}>
            <td>{art}</td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{quantity_in_shop}</td>
            <td>{retail}</td>
            <td>{opt}</td>
            <td>
                <Images img1={image1} img2={image2} img3={image3}/>
            </td>
            <td style={{textAlign: 'right'}}>
                <TableItemBtn props={props}/>               
            </td>
        </tr>
    )
})

export const StoreTable = memo(({page}) => {
    const paginatePage = useSelector(state => state.infiniteScroll[page].page);
    const filters = useSelector(state => state.filters.store.values);
    
    const { 
        data = {
            count: null,
            results: null
        }, 
        isFetching,
        isError, 
        error 
    } = useGetStoreItemsQuery({filters, page: paginatePage});

    return (
        <InfiniteScroll
            page="store"
            count={data.count}
            hasMore={!isFetching && !isError}
        >
            <div className="store-table">
                <table>
                    <thead>
                        <tr>
                            <th width={200}>Код</th>
                            <th width={520}>Наименование</th>
                            <th width={100}>Склад</th>
                            <th width={100}>Магазин</th>
                            <th width={100}>Розница</th>
                            <th width={100}>Опт</th>
                            <th>Изображение</th>
                            <th width={60}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.results?.length == 0 && 
                            !isFetching &&
                            !isError &&
                            <tr><td width={200}>Таких товаров нет</td></tr>
                        }
                        {
                            data.results?.length != 0 && 
                            data.results &&
                            data.results.map(item => 
                                <TableItem 
                                    props={item} 
                                    key={item.id}
                                />
                            )
                        } 
                    </tbody>
                </table>
                { isFetching && <Loading/> }
                { isError && <Error error={error}/> }
            </div>
        </InfiniteScroll>               
    )
})