import { render, cleanup, afterEach } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";

it("should render", () => {
  const { container } = render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
  expect(container).toBeTruthy();
});
