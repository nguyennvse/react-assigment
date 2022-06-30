import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ListProductsRedux } from "./list-products-redux";

it("should render list product", () => {
  render(
    <Provider>
      <ListProductsRedux />
    </Provider>
  );
});
