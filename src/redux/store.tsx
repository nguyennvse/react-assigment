import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import isOpenSideBarReducer from "./is-open-side-bar";
import selectedProductsReducer from "./selected-products-slide";
import storage from 'redux-persist/lib/storage';
// import persistReducer from "redux-persist/es/persistReducer";
// import PersistReducer from "./local-storage-slide";
import thunk from 'redux-thunk';
import { useDispatch } from "react-redux";

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig,PersistReducer)

export const store = configureStore({
  reducer: {
    selectedProducts: selectedProductsReducer,
    isOpenSideBar: isOpenSideBarReducer,
    // signedInUser: persistedReducer
  },
  middleware: [thunk]
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
