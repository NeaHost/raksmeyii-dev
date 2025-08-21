import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

import {
  increment,
  decrement,
  incrementByAmount,
} from "../../store/counter/counterSlice";

const ProductPage = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button
        className="w-100 p-4 bg-blue-500 me-20"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        className="w-100 p-4 bg-red-500"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
};

export default ProductPage;
