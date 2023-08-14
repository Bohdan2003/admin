import { memo } from "react";
import { 
    useGetFiltersQuery, 
    useDeleteFilterMutation, 
    useGetTegsQuery,
    useDeleteTegMutation
} from "../../api";
import { 
    changeEditMode,
    setCategory,
    setSubcategory, 
    setTeg, 
    deleteTeg, 
    clearTags 
} from "./filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateTegMutation, useCreateFilterMutation } from "../../api";

import { Loading } from "../loading/Loading"
import { Error } from "../error/Error";
import { ReactComponent as BucketIcon } from "../../assets/bucket.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { FilterForm } from "../filterForm/FilterForm";
import "./filters.scss";

const FilterAdd = ({firstItem, filterAddPayload}) => {
    const fetch = useCreateFilterMutation();
    return (
        <FilterForm 
            fetch={fetch}
            firstItem={firstItem} 
            filterAddPayload={filterAddPayload}
        />
    )
}

const TegAdd = ({firstItem, filterAddPayload}) => {
    const fetch = useCreateTegMutation();
    return (
        <FilterForm 
            fetch={fetch}
            firstItem={firstItem} 
            filterAddPayload={filterAddPayload}
        />
    )
}

const FiltersTab = memo(({page, data = [], title, selectedInput, handleChange, filterAddPayload}) => { 
    const dispatch = useDispatch();
    const [ deleteFilter ] = useDeleteFilterMutation();   
    const { editMode } = useSelector(state => state.filters[page]); 
    const firstItem = (data.length == 0);
    
    if(data.length <= 0 && !editMode) return;

    return (
        <div className="filters__tab">
            <div className="filters__title">{title}</div>
            <div className="filters__inputs">
                {
                    data.map(item => {
                        const checked = selectedInput == item.id;
                        return (
                            <label className="filters__input" key={item.id}>
                                <input type="checkbox" 
                                       value={item.id}
                                       checked={checked}
                                       onChange={() => {
                                            handleChange(item);
                                       }}
                                />
                                <span className={`filters__span ${checked ? "filters__span--selected" : ""}`}>
                                    {item.name}
                                </span>
                                {
                                    editMode 
                                    ? <button className="filters__input-delete"
                                            onClick={() => {
                                                deleteFilter(item.id).unwrap()
                                                    .then(() => {
                                                        dispatch(setSubcategory({
                                                            page,
                                                            id: null
                                                        }));
                                                    })
                                                    .catch(e => {console.log(e);});
                                            }}        
                                      >
                                        <BucketIcon/>
                                      </button>
                                    : ''
                                }
                            </label>
                        )
                    })
                } 
            </div>
            {
                editMode && 
                <FilterAdd
                    firstItem={firstItem} 
                    filterAddPayload={filterAddPayload}
                />
            }
        </div>
    )
})

const FiltersTags = memo(({page}) => {
    const dispatch = useDispatch();
    const { 
        editMode,
        values: {
            subcategory,
            tegs
        }
    } = useSelector(state => state.filters[page]);

    const [ createTeg ] = useCreateTegMutation();
    const [ deleteTegOnServer ] = useDeleteTegMutation();
    const { data, isLoading, isError, error } = useGetTegsQuery(subcategory);

    if(isLoading) return;
    if(isError) return <Error error={error}/>;

    return (
        <div className="filters__tags">
            {
                data.map((item, i) => (
                    <div className="filters__tab" key={item.id}>
                        <div className="filters__box">
                            <div className="filters__title">{item.name}</div>
                            {
                                editMode 
                                ? <button className="filters__input-delete"
                                        onClick={() => {
                                            deleteTegOnServer(item.id);
                                        }}        
                                    >
                                    <DeleteIcon/>
                                    </button>
                                : ''
                            }
                        </div>
                        <div className="filters__inputs">
                            {
                                item.children.map(child => {
                                    let checked;
                                    if(tegs[i]) {
                                        checked = tegs[i].findIndex(elem => elem.id == child.id) > -1;
                                    } else {
                                        checked = false;
                                    }

                                    return (
                                        <label className="filters__input" 
                                            key={child.id}
                                        >
                                            <input type="checkbox" 
                                                name="category" 
                                                value={child.name}
                                                checked={checked}
                                                onChange={() => {
                                                    if(checked){
                                                        dispatch(deleteTeg({
                                                            page,
                                                            column: i,
                                                            id: child.id
                                                        }))
                                                    } else {
                                                        dispatch(setTeg({
                                                            page,
                                                            column: i,
                                                            teg: {
                                                                id: child.id,
                                                                name: child.name
                                                            }
                                                        }))
                                                    }
                                                }}
                                            />
                                            <span className={`filters__span ${checked ? "filters__span--selected" : ""}`}>
                                                {child.name}
                                            </span>
                                            {
                                                editMode 
                                                ? <button className="filters__input-delete"
                                                        onClick={() => {
                                                            deleteTegOnServer(child.id);
                                                        }}        
                                                  >
                                                    <BucketIcon/>
                                                  </button>
                                                : ''
                                            }
                                        </label>
                                    )
                                })
                            } 
                        </div>
                        {
                            editMode &&
                            <TegAdd createTeg={createTeg} filterAddPayload={{
                                level_teg: 2,
                                parent_teg: item.id,
                               }}/>
                            
                        }
                    </div>)
                )
            }
            {
                editMode &&
                <TegAdd firstItem={true} filterAddPayload={{
                    level_teg: 1,
                    parent_filter: subcategory,
                }}/>
                
            }
        </div>
    )
})

export const Filters = memo(({page = '', filtersRef = null, visible = false, hiddenTeg = false}) => {
    const dispatch = useDispatch();
    const { 
        editMode, 
        values: {
            category, subcategory
        }
    } = useSelector(state => state.filters[page]);

    const { data: categoriesData, isLoading, isError, error } = useGetFiltersQuery();

    return (
        <div className={`filters ${visible ? 'filters--visible' : ''}`} ref={filtersRef}>
            <button className="filters__btn-mode"
                    onClick={() => {dispatch(changeEditMode({page}))}}
            >
                {editMode ? 'Назад' : 'Редактировать'}
            </button>
            {
                isLoading
                ? <Loading/>
                : isError 
                ? <Error error={error}/>
                : 
                <FiltersTab page={page}
                            data={categoriesData}
                            title="Категория"
                            selectedInput={category}
                            filterAddPayload={{
                                level_filter: 1
                            }}
                            handleChange={item => {
                                if(category != item.id) {
                                    dispatch(setCategory({
                                        page,
                                        id: item.id
                                    }))
                                } else {
                                    dispatch(setCategory({
                                        page,
                                        id: null
                                    }))
                                }
                                if(subcategory){
                                    dispatch(setSubcategory({
                                        page,
                                        id: null
                                    }));        
                                }
                                dispatch(clearTags({page}));                 
                            }}
                />
            }
            {
                category &&
                <FiltersTab page={page}
                            data={categoriesData[categoriesData.findIndex(item => item.id == category )].children}
                            lavel={2}
                            title="Подкатегория"
                            selectedInput={subcategory}
                            filterAddPayload={{
                                level_filter: 2,
                                parent_filter: category
                            }}
                            handleChange={item => {
                                if(subcategory != item.id){
                                    dispatch(setSubcategory({
                                        page,
                                        id: item.id
                                    }));
                                } else {
                                    dispatch(setSubcategory({
                                        page,
                                        id: null
                                    }));
                                }
                                dispatch(clearTags({page}));
                            }}
                />
               
            }
            { 
              subcategory && !hiddenTeg 
              ? <FiltersTags page={page}/> 
              : ''
            }           
        </div>
    )
})