import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface CounterState {
    value: number;
}

// Set the initial state
const initialState: CounterState = {
    value: 0,
};

// Create the slice
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

// Export actions and reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
