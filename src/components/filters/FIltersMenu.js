import "./filtersMenu.scss";

export const FiltersMenu = ({filtersRef}) => {
    return (
        <div className="filters-menu">
            <button className="filters-menu__btn"
                    onClick={() => {
                        // console.log(filtersRef);
                        filtersRef.current.classList.toggle("filters--visible")
                    }}
            >Фильтр</button>
            <button className="filters-menu__btn-clear">Сбросить*</button>
            <div className="filters-menu__input-wrapper">
                <input className="filters-menu__input" type="text" placeholder="Найти..."/>
            </div>
        </div>
    )
}