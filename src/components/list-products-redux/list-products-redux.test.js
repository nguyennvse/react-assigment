import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ListProductsRedux } from "./list-products-redux";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

it("should render list product", () => {
  const {container} = render(
    <Provider store={store}>
      <ListProductsRedux />
    </Provider>
  );
  expect(container).toBeTruthy();
});
