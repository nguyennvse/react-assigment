import { render, cleanup, afterEach, screen } from "@testing-library/react";
import { useState } from "react";
import ContextStore from "../../context/context-store";
import ShoppingCart from "./shopping-cart";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import Layout from "../layout";
function renderWithRedux(comp) {
  return {
    ...render(
      <Provider store={store}>
        <ContextStore.Provider value={[[{ name: "test" }]]}>
          <BrowserRouter>{comp}</BrowserRouter>
        </ContextStore.Provider>
      </Provider>
    ),
    store,
  };
}

it("context should be array", () => {
  const { getAllByTestId, getAllByText, container } = renderWithRedux(
    <ShoppingCart />
  );
  expect(screen).toHaveTextContent('test');
});
