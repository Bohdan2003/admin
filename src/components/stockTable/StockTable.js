import { memo, useState } from "react";

import { StockTableEditItem } from "../stockTableEditItem/StockTableEditItem";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { Images } from "../images/Images";

import "./stockTable.scss";

const StockTableItem = memo(({props}) => {
    const [ editMode, setEditMode ] = useState(false);
    const [ state, setState ] = useState(props);
    const [ itemHidden, setItemHidden ] = useState(false);
    const {art, name, quantity, quantity_in_shop, price, opt, retail, image1, image2, image3, id } = state;

    if(itemHidden) return;

    if(editMode) return (
        <tr>
            <td colSpan="9" style={{padding: 0}}>               
                <StockTableEditItem props={state} 
                            saveChange={setState} 
                            hiddenItem={setItemHidden} 
                            cancel={() => {
                                setEditMode(false)
                            }}
                />
            </td>
        </tr>
    )

    return (
        <tr key={id}>
            <td width={200}>{art}</td>
            <td width={520}>{name}</td>
            <td width={100}>{quantity}</td>
            <td width={100}>{quantity_in_shop}</td>
            <td width={100}>{price}</td>
            <td width={100}>{retail}</td>
            <td width={100}>{opt}</td>
            <td>
                <Images img1={image1} img2={image2} img3={image3}/>
            </td>
            <td width={60}>
                <button className="stock-table__btn-edit"
                        onClick={() => {
                            setEditMode(true)      
                        }}
                ><EditIcon/></button>
            </td> 
        </tr>
    )
})

export const StockTable = memo(({items, hiddenHead = false}) => {
    return (
        <div className="stock-table">
            <table>
                {   !hiddenHead &&
                    <thead>
                        <tr>
                            <th>Код</th>
                            <th>Наименование</th>
                            <th>Склад</th>
                            <th>Магазин</th>
                            <th>Закупка</th>
                            <th>Розница</th>
                            <th>Опт</th>
                            <th>Изображение</th>
                            <th></th>
                        </tr>
                    </thead>
                }
                <tbody>
                    {
                        items.length == 0
                        ? <tr><td>Нет элементов</td></tr>
                        : items.map(item => <StockTableItem props={item} key={item.id}/>)
                    } 
                </tbody>
            </table>
        </div>
    )
})