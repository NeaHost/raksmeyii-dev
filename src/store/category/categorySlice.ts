// features/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CategoryModel from "../../model/category_model";



interface CategoryState {
    categories: CategoryModel[];
    activeCategory: CategoryModel | null;
    search: string;
}

const initialState: CategoryState = {
    categories: [],
    search: '',
    activeCategory: null, // Default to "All" or null
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<CategoryModel[]>) {
            state.categories = action.payload;
            // Set "All" category as the default active category
            state.activeCategory = action.payload.find((c) => c.id === 0) || null;
        },
        setActiveCategory(state, action: PayloadAction<CategoryModel>) {
            state.activeCategory = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
    },
});

export const { setCategories, setActiveCategory, setSearch } = categorySlice.actions;
export default categorySlice.reducer;
