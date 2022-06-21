import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { BaseReduxApi } from "./redux-api";
import selectedProductsReducer from "./selected-products-slide";

export const store = configureStore({
  reducer: {
     selectedProducts: selectedProductsReducer,
     [BaseReduxApi.reducerPath]:BaseReduxApi.reducer
     },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BaseReduxApi.middleware),
});
setupListeners(store.dispatch)