import { useState } from "react";
import { useGetFiltersQuery } from "../../api";

import "./filters.scss"

export const Filters = ({filtersRef}) => {

    const { data, isLoading, isError } = useGetFiltersQuery();
    const [ selectedCategory, setSelectedCategry ] = useState(''); 

    console.log(selectedCategory)

    const setContent = () => {
        if(isLoading) return <div>loading...</div>
        if(isError) return <div>erorr...</div>

        console.log(data);

        return data.map(item => {
            return (
                <label className="filters__input" 
                       key={item.id}
                >
                    <input type="radio" 
                           name="category" 
                           value={item.id}
                           checked={selectedCategory}
                           onChange={e => {setSelectedCategry(e.target.value)}}
                    />
                    <span className={`filters__span ${selectedCategory == item.id ? "filters__span--selected" : ""}`}>
                        {item.name}
                    </span>
                </label>
            )
        })
    }

    const content = setContent();

    return (
        <div className="filters" ref={filtersRef}>
            <div className="filters__category">
                <div className="filters__title">Категория</div>
                <div className="filters__inputs">
                    {content} 
                </div>
            </div>
            <div className="filters__subcategory">
                <div className="filters__title">Подкатегория</div>
                {/* {content}  */}
            </div>
        </div>
    )
}