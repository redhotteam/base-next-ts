import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
};
