import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  address: {}
};

export const addressReducer = createReducer(initialState, {
  GET_ADDRESS: (state, action) => {
    console.log("payload", action.payload);

    const address = action.payload;
    return { ...state, address };
  }
});
