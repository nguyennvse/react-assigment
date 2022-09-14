import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import ListProductsRedux from "./list-products-redux";
import ContextStore from "../../context/context-store";
import { get } from "../../services/base-api";
jest.mock("../../services/base-api");
const mockData = {
  data: {
    products: [
      {
        id: 1,
        title: "iPhone XXXX",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
      },
    ],
  },
};
it("should render list product", () => {
  const { container } = render(
    <Provider store={store}>
      <ListProductsRedux />
    </Provider>
  );
  expect(container).toBeTruthy();
});

const renderWithMockReduxStore = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ContextStore.Provider value={[]}>
          <ListProductsRedux />
        </ContextStore.Provider>
      </BrowserRouter>
    </Provider>
  );
};

it("should render list product", async () => {
  get.mockResolvedValue(Promise.resolve(mockData));
  const { container, getByTestId, findByText } = renderWithMockReduxStore();
  await act(async () => {  hô
    await Promise.resolve();
  });
  screen.debug();
  expect(container).toBeTruthy();
  expect(screen.getByText(/iPhone XXXX/i)).toBeInTheDocument();
});
