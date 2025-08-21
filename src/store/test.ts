import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Product interface
interface Product {
    id: number;
    name: string;
    price: number;
}

// Define the initial state (array of products)
const initialState: Product[] = [];

// Create the slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Add a new product
        addProduct: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
        },
        // Remove a product by ID
        removeProduct: (state, action: PayloadAction<number>) => {
            return state.filter((product) => product.id !== action.payload);
        },
        // Update a product by ID
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.findIndex((product) => product.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload; // Update the product
            }
        },
    },
});

// Export actions
export const { addProduct, removeProduct, updateProduct } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
