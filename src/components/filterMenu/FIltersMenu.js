import { memo } from "react";
import { setSearch, clearFilters } from "../filters/filtersSlice";
import { resetPage } from "../infiniteScroll/infiniteScrollSlice";
import { useSelector, useDispatch } from "react-redux";
import "./filtersMenu.scss";

import { Search } from "../search/Search";

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
            <Search
                placeholder="Найти..."
                value={search}
                disabled={disabled}
                setValue={value => {
                    dispatch(resetPage(page)); 
                    dispatch(setSearch({ page, value }));
                }}
            />         
        </div>
    )
})