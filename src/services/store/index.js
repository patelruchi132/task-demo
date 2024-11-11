import { configureStore } from "@reduxjs/toolkit";
import assetReducer from "./Assets/slice"

const store = configureStore({
  reducer: {
  assets: assetReducer
  },
});

export default store;
