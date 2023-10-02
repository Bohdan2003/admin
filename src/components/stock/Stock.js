import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveSection, removeActiveSection } from "./stockSlice";

import { SERVER_URL } from "../../keys";
import { FiltersMenu } from "../filterMenu/FIltersMenu";
import { StockMain } from "../stockMain/StockMain";
import { Rate } from "../rate/Rate";
import { StockEnds } from "../stockEnds/StockEnds";
import { StockAdd } from "../stockAdd/StockAdd";

import "./stock.scss";

const page = 'stock';

const StockBtn = ({name, text}) => {
    const dispatch = useDispatch();
    const activeSection = useSelector(state => state.stock.activeSection);
    return (
        <button className={`stock__btn stock__btn-${name} ${activeSection == name ? 'stock__btn--active' : ''}`}
                onClick={() => {
                   if(activeSection == name) {
                        dispatch(removeActiveSection());
                   } else {
                        dispatch(setActiveSection(name));
                   } 
                }}
        >{text}</button>
    )
}

const Stock = () => {
    const activeSection = useSelector(state => state.stock.activeSection);
    const filtersRef = useRef();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <section className="stock">
            <div className="stock__top">
                <div className="stock__head">
                    <FiltersMenu page={page} filtersRef={filtersRef} disabled={activeSection != "main"}/>
                    <div>
                        <StockBtn name='rate' text="Курс"/>
                        <StockBtn name='ends' text="Заканчивается"/>
                        <StockBtn name='add' text="Добавить"/>
                        <StockBtn name='download' text="Загрузить"/>    
                        <a className="stock__btn stock__btn-upload"
                            href={`${SERVER_URL}admin/product/dowload_ex_data/`}
                            download
                        >Выгрузить</a>
                    </div>
                </div>
                
            </div>
            { activeSection == "main" && <StockMain page={page} filtersRef={filtersRef}/>} 
            { activeSection == "rate" && <Rate/>} 
            { activeSection == "ends" && <StockEnds/>} 
            { activeSection == "add" || activeSection == "download" ? <StockAdd/> : ''} 
        </section>
    )
}

export default Stock