import { render, cleanup, afterEach } from "@testing-library/react";
import { useState } from "react";
import ContextStore from "../../context/context-store";
import ShoppingCart from "./shopping-cart";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { createMemoryHistory } from "history";
import Layout from '../layout';
function renderWithContext(component) {
  const store = { value: [{ name: "test" }], setValue: jest.fn() };
  console.log("aaaaaaaaaaaaaaaaa", store);
  return {
    ...render(
      <ContextStore.Provider value={store}>{component}</ContextStore.Provider>
    ),
  };
}

function renderWithRedux(comp) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Provider store={store}>
        <ContextStore.Provider value={[[{ name: "test" }], jest.fn()]}>
          <Routes>
            <Route path="/" element={<Layout />}>
            
            <Route path="/" element={comp}></Route>
            </Route>
           
            </Routes>
        </ContextStore.Provider>
      </Provider>
    ),
    store,
  };
}

it("context should be array", () => {
  const { getAllByTestId } = renderWithRedux(<ShoppingCart />);
  console.log(getAllByTestId("product-name"));
  expect(getAllByTestId("product-name")).toBeTruthy;
});
