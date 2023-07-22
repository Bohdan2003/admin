import { memo } from "react";
import { setSearch } from "./filtersSlice";
import { useSelector, useDispatch } from "react-redux";
import "./filtersMenu.scss";

export const FiltersMenu = memo(({page, filtersRef}) => {

    const search = useSelector(state => state.filters[page].params.search);
    const dispatch = useDispatch();

    return (
        <div className="filters-menu">
            <button className="filters-menu__btn"
                    onClick={() => {
                        filtersRef.current.classList.toggle("filters--visible")
                    }}
            >Фильтр</button>
            <button className="filters-menu__btn-clear">Сбросить*</button>
            <div className="filters-menu__input-wrapper">
                <input className="filters-menu__input" 
                        type="text" 
                        placeholder="Найти..."
                        value={search}
                        onChange={e => {
                           dispatch(setSearch({
                                page,
                                value: e.target.value
                           }));
                        }}
                />
            </div>
        </div>
    )
})