import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../services/base-api.js";
// import { getProductsByQuery } from "./redux-api";

export const getProductsThunk = createAsyncThunk(
  "selectedProducts/getAll",
  async () => {
    console.log("real thunk");
    const resss = await get("products");
    console.log("resss",resss);
    return resss.data;
  }
);
const initialState = {
  value: [],
  fetchedList: [],
  isLoading: false,
};

export const selectedProductsSlide = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    increment: (state, action) => {
      const existedProdcut = state.value.find(
        (v) => v.id === action.payload.id
      );
      if (existedProdcut) {
        existedProdcut.quant += 1;
      } else {
        state.value.push({ ...action.payload });
      }
    },
    decrement: (state, action) => {
      const existedProdcut = state.value.find(
        (v) => v.id === action.payload.id
      );
      if (!existedProdcut) return;
      const quant = existedProdcut.quant - 1;
      if (!quant) {
        state.value = state.value.filter((v) => v.id !== existedProdcut.id);
      } else {
        existedProdcut.quant = quant;
      }
    },
    setSelectedList: (state, action) => {
      state.fetchedList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("thunk res", action.payload);
      state.fetchedList = action.payload.products;
    });
  },
});

export const { increment, decrement, setSelectedList } =
  selectedProductsSlide.actions;

export default selectedProductsSlide.reducer;
