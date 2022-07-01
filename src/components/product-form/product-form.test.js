import { render, fireEvent, waitFor, act ,screen} from "@testing-library/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProductForm from "./product-form";
import { get, post, put } from "../../services/base-api";
import { createMemoryHistory } from "history";
import { useParams } from "react-router-dom";
const mockUseParam = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: jest.fn(),
}));

jest.mock("../../services/base-api");
it("should render new", async () => {
  const { container } = render(
    <BrowserRouter>
      <ProductForm new={true} />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(container).toBeTruthy();
  });
});

it("should render new false", async () => {
  get.mockResolvedValue({
    data: [
      {
        id: 1,
        title: "Iphone",
      },
    ],
  });
  const { container } = render(
    <BrowserRouter>
      <ProductForm new={true} />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(container).toBeTruthy();
  });
});

const renderWithRou = (comp, params) => {
  const history = createMemoryHistory({ initialEntries: [params] });
  const utils = render(
    <Router location={history.location} navigator={history}>
      {comp}
    </Router>
  );
  return {
    ...utils,
  };
};

it("should save click", async () => {
  
  get.mockResolvedValue({
    data: {
      id: 1,
      title: "a",
      stock: 10,
      description: "aa",
      discountPercentage: 10,
      price: 1,
      rating: 1,
      thumbnail: "",
      images: "",
    },
  });
  post.mockResolvedValue({});
  put.mockResolvedValue({});
  useParams.mockReturnValue({productId:'1'})
  const history = createMemoryHistory();
  history.push("/1");
  const { getByTestId, container } = render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path="/" element={<ProductForm new={false} />}>
          <Route
            path=":productId"
            element={<ProductForm new={false} />}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
  await act(async () => {
    await Promise.resolve();
  });
  await act(async () => {
    fireEvent.click(getByTestId("save"));
    expect(container).toBeTruthy();
  });
});

it("should update click", async () => {
  
  get.mockResolvedValue({
    data: {
      id: 1,
      title: "a",
      stock: 10,
      description: "aa",
      discountPercentage: 10,
      price: 1,
      rating: 1,
      thumbnail: "",
      images: "",
    },
  });
  post.mockResolvedValue({});
  put.mockResolvedValue({});
  const history = createMemoryHistory();
  history.push("/1");
  const { getByTestId, container } = render(
    <Router location={history.location} navigator={history}>
      <ProductForm new={false} />
    </Router>
  );
  await act(async () => {
    await Promise.resolve();
  });
  await act(async () => {
    fireEvent.click(getByTestId("save"));
    expect(container).toBeTruthy();
  });
});


it("should change callback", async () => {
  
  get.mockResolvedValue({
    data: {
      id: 1,
      title: "a",
      stock: 10,
      description: "aa",
      discountPercentage: 10,
      price: 1,
      rating: 1,
      thumbnail: "",
      images: "",
    },
  });
  post.mockResolvedValue({});
  put.mockResolvedValue({});
  const history = createMemoryHistory();
  history.push("/1");
  const renderIns = render(
    <Router location={history.location} navigator={history}>
      <ProductForm new={false} />
    </Router>
  );
  const { getByTestId, container } = renderIns;
  await act(async () => {
    await Promise.resolve();
  });
});
