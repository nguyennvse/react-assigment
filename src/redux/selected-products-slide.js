import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../services/base-api";
import { getProductsByQuery } from "./redux-api";

export const getProductsThunk = createAsyncThunk(
  "selectedProducts/getAll",
  async () => {
    const resss = await get("products");
    return resss.data;
  }
);
const initialState = {
  value: [],
  fetchedList:[]
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
        state.value = state.value.filter(
          (v) => v.id !== existedProdcut.id
        );
      } else {
        existedProdcut.quant = quant;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.fetchedList = action.payload.products;
    });
  },
});

export const { increment, decrement } = selectedProductsSlide.actions;

export default selectedProductsSlide.reducer;
