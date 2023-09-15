import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./reducer";
const store = configureStore({
  reducer: { custom: addressReducer }
});
export default store;
