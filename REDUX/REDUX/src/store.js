import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/productsService";
import { setupListeners } from "@reduxjs/toolkit/query";
import selectedProductReducer from "./slices/selectedProductSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    selectedProduct: selectedProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);