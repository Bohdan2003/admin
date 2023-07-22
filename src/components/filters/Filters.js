import { memo } from "react";
import { 
    useGetFiltersQuery, 
    useDeleteFilterMutation, 
    useGetTegsQuery,
    useDeleteTegMutation
} from "../../api";
import { 
    changeEditMode,
    setSelectedCategory,
    setSelectedSubcategory, 
    setCategory, 
    setTeg, 
    deleteTeg, 
    clearTags 
} from "./filtersSlice";
import { useDispatch, useSelector } from "react-redux";

import { Error } from "../error/Error";
import { ReactComponent as BucketIcon } from "../../assets/bucket.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { FilterAdd } from "./FilterAdd";
import { TegAdd } from "./TegAdd";

import "./filters.scss";

const FiltersTab = memo(({page, data = [], title, selectedInput, handleChange, filterAddProps}) => { 
    const dispatch = useDispatch();
    const [ deleteFilter ] = useDeleteFilterMutation();
    const { editMode, selectedCategory } = useSelector(state => state.filters[page]); 
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
                                                        dispatch(setSelectedSubcategory({
                                                            page,
                                                            id: null
                                                        }));
                                                        dispatch(setCategory({
                                                            page: 'store',
                                                            category: selectedCategory
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
                editMode 
                ? <FilterAdd 
                    firstItem={firstItem} 
                    filterAddProps={filterAddProps}
                  />
                : ''
            }
        </div>
    )
})

const FiltersTags = memo(({page, id}) => {
    const dispatch = useDispatch();
    const editMode = useSelector(state => state.filters[page].editMode);
    const selectedCategory = useSelector(state => state.filters.store.params.category);

    const [ deleteTegOnServer ] = useDeleteTegMutation();
    const { data, isLoading, isError, error } = useGetTegsQuery(id);
    const arrOfSelectedTegs = useSelector(state => state.filters.store.params.tegs); 

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
                                    if(arrOfSelectedTegs[i]) {
                                        checked = arrOfSelectedTegs[i].findIndex(elem => elem.id == child.id) > -1;
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
                            editMode 
                            ? <TegAdd filterAddProps={{
                                level_teg: 2,
                                parent_teg: item.id,
                               }}/>
                            : ''
                        }
                    </div>)
                )
            }
            {
                editMode 
                ? <TegAdd firstItem={true} filterAddProps={{
                    level_teg: 1,
                    parent_filter: selectedCategory,
                }}/>
                : ''
            }
        </div>
    )
})

export const Filters = memo(({page, filtersRef}) => {
    const dispatch = useDispatch();
    const { editMode, selectedCategory, selectedSubcategory } = useSelector(state => state.filters[page]);

    const { data: categoriesData, isLoading, isError, error } = useGetFiltersQuery();

    return (
        <div className="filters" ref={filtersRef}>
            <button className="filters__btn-mode"
                    onClick={() => {dispatch(changeEditMode({page}))}}
            >
                {editMode ? 'Назад' : 'Редактировать'}
            </button>
            {
                isLoading
                ? <div>loading...</div>
                : isError 
                ? <Error error={error}/>
                : 
                <FiltersTab page={page}
                            data={categoriesData}
                            title="Категория"
                            selectedInput={selectedCategory}
                            filterAddProps={{
                                level_filter: 1
                            }}
                            handleChange={item => {
                                if(selectedCategory != item.id) {
                                    dispatch(setSelectedCategory({
                                        page,
                                        id: item.id
                                    }))        
                                    dispatch(setSelectedSubcategory({
                                        page,
                                        id: null
                                    }));                                     
                                    dispatch(setCategory({
                                        page,
                                        category: item.id
                                    }));  
                                } else {
                                    dispatch(setSelectedCategory({
                                        page,
                                        id: null
                                    }))
                                    dispatch(setSelectedSubcategory({
                                        page,
                                        id: null
                                    })); 
                                    dispatch(setCategory({
                                        page,
                                        category: ''
                                    })); 
                                }
                                dispatch(clearTags({page}));
                                setSelectedSubcategory('');                     
                            }}
                />
            }
            {
                selectedCategory
                ? <FiltersTab page={page}
                              data={categoriesData[categoriesData.findIndex(item => item.id == selectedCategory )].children}
                              lavel={2}
                              title="Подкатегория"
                              selectedInput={selectedSubcategory}
                              filterAddProps={{
                                level_filter: 2,
                                parent_filter: selectedCategory
                              }}
                              handleChange={item => {
                                    if(selectedSubcategory != item.id){
                                        dispatch(setSelectedSubcategory({
                                            page,
                                            id: item.id
                                        }));
                                        dispatch(setCategory({
                                            page: 'store',
                                            category: item.id
                                        })); 
                                    } else {
                                        dispatch(setSelectedSubcategory({
                                            page,
                                            id: null
                                        }));
                                        dispatch(setCategory({
                                            page: 'store',
                                            category: selectedCategory
                                        }));
                                    }
                                    dispatch(clearTags({page}));
                              }}
                    />
                : ''
            }
            {
                selectedSubcategory
                ? <FiltersTags page={page} id={selectedSubcategory}/>
                : ''
            }           
        </div>
    )
})