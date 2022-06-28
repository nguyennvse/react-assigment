import ProductCard from "./product-card";
import { render, fireEvent } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import ContextStore from "../../context/context-store";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Layout from "../layout";
function renderWithRedux(comp,contextvalue = [[{ name: "test" }], jest.fn()]) {
  return {
    ...render(
      <Provider store={store}>
        <ContextStore.Provider value={contextvalue}>
          <BrowserRouter>
          {comp}

            {/* <Routes>
              <Route path="/" element={<Layout />}></Route>
              <Route path="/" element={comp}></Route>
            </Routes> */}
          </BrowserRouter>
        </ContextStore.Provider>
      </Provider>
    ),
    store,
  };
}

it("should be show product detail", () => {
  const { getByTestId } = renderWithRedux(
    <ProductCard
      id={0}
      title={"Iphone9"}
      stock={100}
      description={"An apple mobile which is nothing like apple"}
      thumbnail={""}
      quant={94}
      isReduxList={false}
      isList={false}
      isShoppingCart={false}
      isReduxShoppingCart={false}
    />
  );
  expect(getByTestId("product-name")).toHaveTextContent("Iphone9");
  expect(getByTestId("description")).toHaveTextContent(
    "An apple mobile which is nothing like apple"
  );
  expect(getByTestId("Stock")).toHaveTextContent("100");
});

it("should navigate", () => {
    const { getByTestId,container } = renderWithRedux(
      <ProductCard
        id={0}
        title={"Iphone9"}
        stock={100}
        description={"An apple mobile which is nothing like apple"}
  
        quant={94}
        isReduxList={false}
        isList={true}
        isShoppingCart={false}
        isReduxShoppingCart={false}
      />
    );
    fireEvent.click(getByTestId('navigate'))
    expect(window.location.pathname).toContain('edit')
  });

  it("should add product to context", () => {
    const contextVal = [{ id:0, title:'Iphone9', quant: 1 }]
    const { getByTestId,container } = renderWithRedux(
      <ProductCard
        id={0}
        title={"Iphone9"}
        stock={100}
        description={"An apple mobile which is nothing like apple"}
  
        quant={94}
        isReduxList={false}
        isList={true}
        isShoppingCart={false}
        isReduxShoppingCart={false}
      />,[contextVal, jest.fn()]
    );
    fireEvent.click(getByTestId('addProductToContext'));
    expect(contextVal[0].quant).toEqual(2)
  });

  it("should add product to context with existed value", () => {
    const contextVal = []
    const { getByTestId,container, } = renderWithRedux(
      <ProductCard
        id={0}
        title={"Iphone9"}
        stock={100}
        description={"An apple mobile which is nothing like apple"}
  
        quant={94}
        isReduxList={false}
        isList={true}
        isShoppingCart={false}
        isReduxShoppingCart={false}
      />,[contextVal, jest.fn()]
    );
    fireEvent.click(getByTestId('addProductToContext'))
    expect(contextVal.length).toBeTruthy();
  });

  it("should add product to redux", () => {
    const contextVal = []
    const { getByTestId,container, } = renderWithRedux(
      <ProductCard
        id={0}
        title={"Iphone9"}
        stock={100}
        description={"An apple mobile which is nothing like apple"}
  
        quant={94}
        isReduxList={true}
        isList={false}
        isShoppingCart={false}
        isReduxShoppingCart={false}
      />,[contextVal, jest.fn()]
    );
    fireEvent.click(getByTestId('addProductToRedux'))
    expect(container).toBeTruthy();
  });

  it("should edit quant", () => {
    const contextVal = [{ id:0, title:'Iphone9', quant: 1 }]
    const { getByTestId,container, } = renderWithRedux(
      <ProductCard
        id={0}
        title={"Iphone9"}
        stock={100}
        description={"An apple mobile which is nothing like apple"}
  
        quant={94}
        isReduxList={false}
        isList={false}
        isShoppingCart={true}
        isReduxShoppingCart={false}
      />,[contextVal, jest.fn()]
    );
    fireEvent.click(getByTestId('editQuantDes'))
    expect(container).toBeTruthy();
  });

  it("should edit quant des", () => {
    const contextVal = [{ id:0, title:'Iphone9', quant: 1 }]
    const { getByTestId,container, } = renderWithRedux(
      <ProductCard
        id={0}
        title={"Iphone9"}
        stock={100}
        description={"An apple mobile which is nothing like apple"}
  
        quant={94}
        isReduxList={false}
        isList={false}
        isShoppingCart={true}
        isReduxShoppingCart={false}
      />,[contextVal, jest.fn()]
    );
    fireEvent.click(getByTestId('editQuant'))
    expect(container).toBeTruthy();
  });

  it("should edit quant redux", () => {
    const contextVal = []
    const { getByTestId,container, } = renderWithRedux(
      <ProductCard
        id={0}
        title={"Iphone9"}
        stock={100}
        description={"An apple mobile which is nothing like apple"}
  
        quant={94}
        isReduxList={false}
        isList={false}
        isShoppingCart={false}
        isReduxShoppingCart={true}
      />,[contextVal, jest.fn()]
    );
    fireEvent.click(getByTestId('editQuantRedux'))
    expect(container).toBeTruthy();
  });

  it("should edit quant redux", () => {
    const contextVal = []
    const { getByTestId,container, } = renderWithRedux(
      <ProductCard
        id={0}
        title={"Iphone9"}
        stock={100}
        description={"An apple mobile which is nothing like apple"}
  
        quant={94}
        isReduxList={true}
        isList={false}
        isShoppingCart={false}
        isReduxShoppingCart={false}
      />,[contextVal, jest.fn()]
    );
    fireEvent.click(getByTestId('navigate'))
    expect(window.location.pathname).toContain('edit')
  });
