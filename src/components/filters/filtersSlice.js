import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    store:{
        editMode: false,
        selectedCategory: null,
        selectedSubcategory: null,
        params: {
            tegs: [[]],
            category: '',
            search: ''
        }
    },
    stock:{
        params: {
            tegs: [[]],
            category: '',
            search: ''
        },
        editMode: false
    }
}

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearch:(state, action) => {
            state[action.payload.page].params.search = action.payload.value;
        },
        changeEditMode:(state, action) => {
            const { page } = action.payload;

            state[page].editMode = !state[page].editMode
        },
        setSelectedCategory:(state, action) => {
            const { page, id } = action.payload;

            state[page].selectedCategory = id;
        },
        setSelectedSubcategory:(state, action) => {
            const { page, id } = action.payload;

            state[page].selectedSubcategory = id;
        },
        setCategory:(state, action) => {
            state[action.payload.page].params.category = action.payload.category;
        },
        setTeg:(state, action) => {
            const { page, column, teg } = action.payload;

            if(!state[page].params.tegs[column]) state[page].params.tegs[column] = [];
            state[page].params.tegs[column] = [...state[page].params.tegs[column], teg];
        },
        deleteTeg:(state, action) => {
            const { column, page, id } = action.payload;

            state[page].params.tegs[column] = state[page].params.tegs[[column]].filter(item => item.id != id);
        },
        clearTags:(state, action) => {
            state[action.payload.page].params.tegs = [[]]
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
    setSelectedCategory,
    setSelectedSubcategory,
    setCategory,
    setTeg,
    deleteTeg,
    clearTags,
    clearFilters
 } = filtersSlice.actions

export default filtersSlice.reducer