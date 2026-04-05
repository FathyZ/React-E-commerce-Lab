import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    select: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { select } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;