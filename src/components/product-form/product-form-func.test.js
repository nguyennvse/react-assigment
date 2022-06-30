import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from "@testing-library/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProductFormFunc from "./product-form-func";
import { get, post, put } from "../../services/base-api";
import { createMemoryHistory } from "history";
import { useParams } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: jest.fn(),
}));

jest.mock("../../services/base-api");
// it("should render isNew", async () => {
//   get.mockResolvedValue({
//     data: {
//       id: 1,
//       title: "a",
//       stock: 10,
//       description: "aa",
//       discountPercentage: 10,
//       price: 1,
//       rating: 1,
//       thumbnail: "",
//       images: "",
//     },
//   });
//   const history = createMemoryHistory();
//   history.push("/1");
//   const { container } = render(
//     <Router location={history.location} navigator={history}>
//       <Routes>
//         <Route path="/" element={<ProductFormFunc isNew={false} />}>
//           <Route
//             path=":productId"
//             element={<ProductFormFunc isNew={false} />}
//           ></Route>
//         </Route>
//       </Routes>
//     </Router>
//   );
//   post.mockResolvedValue({});
//   put.mockResolvedValue({});
//   useParams.mockReturnValue({ productId: "" });
//   await waitFor(() => {
//     expect(container).toBeTruthy();
//   });
// });

// it("should render isNew false", async () => {
//   get.mockResolvedValue({
//     data: {
//       id: 1,
//       title: "a",
//       stock: 10,
//       description: "aa",
//       discountPercentage: 10,
//       price: 1,
//       rating: 1,
//       thumbnail: "",
//       images: "",
//     },
//   });
//   const history = createMemoryHistory();
//   history.push("/1");
//   const { container } = render(
//     <Router location={history.location} navigator={history}>
//       <Routes>
//         <Route path="/" element={<ProductFormFunc isNew={false} />}>
//           <Route
//             path=":productId"
//             element={<ProductFormFunc isNew={false} />}
//           ></Route>
//         </Route>
//       </Routes>
//     </Router>
//   );
//   post.mockResolvedValue({});
//   put.mockResolvedValue({});
//   useParams.mockReturnValue({ productId: "" });
//   await waitFor(() => {
//     expect(container).toBeTruthy();
//   });
// });

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
  useParams.mockReturnValue({ productId: "1" });
  const history = createMemoryHistory();
  history.push("/1");
  const { getByTestId, container } = render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path="/" element={<ProductFormFunc isNew={false} />}>
          <Route
            path=":productId"
            element={<ProductFormFunc isNew={false} />}
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
  useParams.mockReturnValue({ productId: false });
  const history = createMemoryHistory();
  history.push("/1");
  const { getByTestId, container } = render(
    <Router location={history.location} navigator={history}>
      <ProductFormFunc isNew={false} />
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
  useParams.mockReturnValue({ productId: "" });
  const history = createMemoryHistory();
  history.push("/1");
  const renderIns = render(
    <Router location={history.location} navigator={history}>
      <ProductFormFunc isNew={false} />
    </Router>
  );
  const { getByTestId, container } = renderIns;
  await act(async () => {
    await Promise.resolve();
  });
});
