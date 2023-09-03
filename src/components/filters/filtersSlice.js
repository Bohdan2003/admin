import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    store:{
        page: 1,
        editMode: false,
        values: {
            search: '',
            category: null,
            subcategory: null,
            tegs: [[]]
        }
    },
    stock:{
        page: 1,
        editMode: false,
        values: {
            search: '',
            category: null,
            subcategory: null,
            tegs: [[]]
        }
    },
    stockAdd:{
        page: 1,
        editMode: false,
        values: {
            category: null,
            subcategory: null
        }
    },
    reportOrders:{
        page: 1,
        values: {
            search: '',
        }
    },
    reportProducts:{
        page: 1,
        values: {
            search: '',
        }
    },
}

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearch:(state, action) => {
            state[action.payload.page].values.search = action.payload.value;
        },
        changeEditMode:(state, action) => {
            const { page } = action.payload;

            state[page].editMode = !state[page].editMode
        },
        setCategory:(state, action) => {
            const { page, id } = action.payload;

            state[page].values.category = id;
        },
        setSubcategory:(state, action) => {
            const { page, id } = action.payload;

            state[page].values.subcategory = id;
        },
        setTeg:(state, action) => {
            const { page, column, teg } = action.payload;
            const filters = state[page].values;
            if(!filters.tegs[column]) filters.tegs[column] = [];
            filters.tegs[column] = [...filters.tegs[column], teg];
        },
        deleteTeg:(state, action) => {
            const { column, page, id } = action.payload;
            const filters = state[page].values;

            filters.tegs[column] = filters.tegs[[column]].filter(item => item.id != id);
        },
        clearTags:(state, action) => {
            state[action.payload.page].values.tegs = [[]]
        },
        clearFilters:(state, action) => {
            const { page } = action.payload;

            state[page] = initialState[page];
        }
    }
})

export const { 
    setSearch,
    changeEditMode,
    setCategory,
    setSubcategory,
    setTeg,
    deleteTeg,
    clearTags,
    clearFilters
 } = filtersSlice.actions

export default filtersSlice.reducer