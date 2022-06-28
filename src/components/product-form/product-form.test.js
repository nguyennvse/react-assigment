import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductForm from "./product-form";
import { get } from "../../services/base-api";
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

it("should save click", async () => {
  get.mockResolvedValue({
    data: [
        {
            id : 0,
            title : "a",
            stock : 0,
            description : "a",
            thumbnail : "",
            discountPercentage : 0,
            images : "",
            price : 1,
            rating : 1,
          },
    ],
  });
  const { container, getByTestId } = render(
    <BrowserRouter>
      <ProductForm productId={1} new={false} />
    </BrowserRouter>
  );
  console.log('clickkkkkkkkkkkkkkkkkkkkk',container)
  fireEvent.click(getByTestId("save"));
  await waitFor(() => {
    expect(container).toBeTruthy();
  });
});
