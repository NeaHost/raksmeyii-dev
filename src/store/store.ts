import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import testReducer from './test'
import categoryReducer from "./category/categorySlice";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        product: testReducer,
        category: categoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disables serialization check
        })
})

// Define TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;