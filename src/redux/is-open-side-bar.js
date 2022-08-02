import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isOpenSideBarSlide = createSlice({
  name: "isOpenSideBar",
  initialState,
  reducers: {
    setIsOpenSideBar: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const { setIsOpenSideBar} = isOpenSideBarSlide.actions;

export default isOpenSideBarSlide.reducer;
