import "./App.css";
import React from "react";
import ListProducts from "./components/list-products/list-products";
import ProductForm from "./components/product-form/product-form";
import Layout from "./components/layout";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ContextStore from "./context/context-store";
import ShoppingCart from "./components/shopping-cart/shopping-cart";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ShoppingCartRedux from "./components/shopping-cart-redux/shopping-cart-redux";
import { ListProductsRedux } from "./components/list-products-redux/list-products-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: [],
    };
  }

  updateContext = (newContext) => {
    this.setState({ context: newContext });
  };

  render() {
    return (
      <Provider store={store}>
        <ContextStore.Provider
          value={{
            value: this.state.context,
            setContext: this.updateContext.bind(this),
          }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<ListProducts />} />
                <Route exact path="/edit" element={<ProductForm new={false} />}>
                  <Route
                    path=":productId"
                    element={<ProductForm new={false} />}
                  ></Route>
                </Route>
                <Route path="/listredux" element={<ListProductsRedux />} />
                <Route path="/new" element={<ProductForm new={true} />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/cartredux" element={<ShoppingCartRedux />}/>
                <Route
                  path="*"
                  element={
                    <main>
                      <p>
                        Not found please <Link to={"/"}>back to home</Link>
                      </p>
                    </main>
                  }
                />
              </Route>
            </Routes>
          </div>
        </ContextStore.Provider>
      </Provider>
    );
  }
}

export default App;
