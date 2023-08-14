import { memo } from "react";
import { setSearch, clearFilters } from "../filters/filtersSlice";
import { useSelector, useDispatch } from "react-redux";
import "./filtersMenu.scss";

export const FiltersMenu = memo(({page, filtersRef, disabled = false}) => {

    const dispatch = useDispatch();
    const { category, search } = useSelector(state => state.filters[page].values);

    return (
        <div className={`filters-menu ${disabled ? 'filters-menu--disabled' : ''}`}>
            <button className="filters-menu__btn"
                    onClick={() => {
                        filtersRef.current?.classList.toggle("filters--visible")
                    }}
            >Фильтр</button>
            <button className={`filters-menu__btn-clear ${category ? 'filters-menu__btn-clear--visible' : ''}`}
                        onClick={() => {
                            dispatch(clearFilters({page}))
                        }}
            >Сбросить*</button>          
            <div className="filters-menu__input-wrapper">
                <input className="filters-menu__input" 
                        type="text" 
                        placeholder="Найти..."
                        value={search}
                        onChange={e => {
                            if(!disabled)
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