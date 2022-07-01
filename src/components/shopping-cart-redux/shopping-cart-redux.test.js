import { render } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import ShoppingCartRedux from "./shopping-cart-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import selectedProductsReducer from "../../redux/selected-products-slide";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const renderWithMockReduxStore = (initState) => {
  const mockSelectedProductsReducer = createSlice({
    name: "selectedProducts",
    initialState: initState,
    reducers: selectedProductsReducer,
  });
  const mockStore = configureStore({
    reducer: {
      selectedProducts: mockSelectedProductsReducer.reducer,
    },
  });
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element={<ShoppingCartRedux />}></Route>
        </Routes> */}
        <ShoppingCartRedux />
      </BrowserRouter>
    </Provider>
  );
};
it("should render redux list ", () => {
  const { container, getByTestId } = renderWithMockReduxStore({
    value: [
      {
        id: 1,
        title: "Iphone9",
        description: "Iphone 9",
        thumbnail: "",
        quant: 1,
      },
    ],
    fetchedList: [],
    isLoading: false,
  });
  expect(getByTestId("product-name")).toHaveTextContent("Iphone9");
});
