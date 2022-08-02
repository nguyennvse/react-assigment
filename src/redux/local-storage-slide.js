import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  signedInUser: '',
  shoppingCart: '',
};

export const AuthenTokenSlide = createSlice({
  name: "authenToken",
  initialState,
  reducers: {
    setSignedInUser: (state, action) => {
      state.signedInUser = action.payload;
    },
    setshoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
  }
});

export const { setSignedInUser , setshoppingCart} = AuthenTokenSlide.actions;

export default AuthenTokenSlide.reducer;
