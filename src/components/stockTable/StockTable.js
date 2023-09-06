import { memo, useState } from "react";

import { InfiniteScroll } from "../infiniteScroll/InfiniteScroll";
import { Loading } from "../loading/Loading";
import { Error } from "../error/Error";
import { StockTableEditItem } from "../stockTableEditItem/StockTableEditItem";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { Images } from "../images/Images";

import "./stockTable.scss";

const TableHead = () => (
    <thead>
        <tr>
            <th width={200}>Код</th>
            <th width={520}>Наименование</th>
            <th width={100}>Склад</th>
            <th width={100}>Магазин</th>
            <th width={100}>Закупка</th>
            <th width={100}>Розница</th>
            <th width={100}>Опт</th>
            <th>Изображение</th>
            <th width={60}></th>
        </tr>
    </thead>
)

const TableItem = memo(({props}) => {
    const [ editMode, setEditMode ] = useState(false);
    const [ itemHidden, setItemHidden ] = useState(false);
    const {
        art, 
        name, 
        quantity, 
        quantity_in_shop, 
        price, 
        currency_symbol,
        previous_quantity,
        opt, 
        retail, 
        image1, 
        image2, 
        image3, 
        id 
    } = props;

    if(itemHidden) return;

    if(editMode) return (
        <tr>
            <td colSpan="9" style={{padding: 0}}>               
                <StockTableEditItem 
                    props={props}  
                    cancel={() => {
                        setEditMode(false)
                    }}
                />
            </td>
        </tr>
    )

    return (
        <tr key={id}>
            <td>{art}</td>
            <td>{name}</td>
            <td>
                {quantity} 
                {previous_quantity > 0 && <><br/>"{previous_quantity}"</>}   
            </td>
            <td>{quantity_in_shop}</td>
            <td>{price}{currency_symbol}</td>
            <td>{retail}{currency_symbol}</td>
            <td>{opt}{currency_symbol}</td>
            <td>
                <Images img1={image1} img2={image2} img3={image3}/>
            </td>
            <td style={{textAlign: 'right'}}>
                <button 
                    className="stock-table__btn-edit"
                    onClick={() => {
                        setEditMode(true)      
                    }}
                ><EditIcon/></button>
            </td> 
        </tr>
    )
})

export const StockTable = memo(({fetchProps, hiddenHead = false}) => {
    const { 
        data = [], 
        isFetching,
        isError, 
        error 
    } = fetchProps;  

    return (
        <div className="stock-table">
            <table>
                { !hiddenHead && <TableHead/> }
                <tbody>
                    {
                        data.length == 0 && 
                        !isFetching &&
                        !isError &&
                        <tr><td width={200}>Таких товаров нет</td></tr>
                    }
                    {
                        data.length != 0 && 
                        data &&
                        data.map(item => 
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
    )
})

export const StockTableInfiniteScroll = memo(({fetchProps, hiddenHead = false}) => {
    const { 
        data = {
            count: null,
            results: null
        }, 
        isFetching,
        isError, 
        error 
    } = fetchProps;  

    return (
        <InfiniteScroll
            page="stock"
            count={data.count}
            hasMore={!isFetching && !isError}
        >
            <div className="stock-table">
                <table>
                    { !hiddenHead && <TableHead/> }
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