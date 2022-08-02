import "./App.css";
import React from "react";
// import ListProducts from "./components/list-products/list-products";
import ProductForm from "./components/product-form/product-form";
import Layout from "./components/layout";
import { Routes, Route, Link } from "react-router-dom";
import ContextStore from "./context/context-store";
// import ShoppingCart from "./components/shopping-cart/shopping-cart";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import ShoppingCartRedux from "./components/shopping-cart-redux/shopping-cart-redux";
import { ListProductsRedux } from "./components/list-products-redux/list-products-redux";
// import ProductFormFunc from "./components/product-form/product-form-func";
// import Login from "./components/login/login";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import AuthenticateGuard from "./guard/authenticate.guard";
const ProductFormFunc = React.lazy(() => import("./components/product-form/product-form-func"));
const ShoppingCartRedux = React.lazy(() => import("./components/shopping-cart-redux/shopping-cart-redux"));
const Login = React.lazy(()=> import("./components/login/login"));

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

  persistor = persistStore(store);
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={this.persistor}>
          <ContextStore.Provider
            value={[this.state.context, this.updateContext.bind(this)]}
          >
            <div className="App">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<ListProductsRedux />} />
                  {/* <Route
                    exact
                    path="/edit"
                    element={<ProductForm new={false} />}
                  >
                    <Route
                      path=":productId"
                      element={<ProductForm new={false} />}
                    ></Route>
                  </Route> */}
                  <Route
                    exact
                    path="/editfunc"
                    element={<ProductFormFunc isNew={true} />}
                  ></Route>
                  <Route
                    path="/editfunc/:productId"
                    element={<ProductFormFunc isNew={false} />}
                  ></Route>
                  {/* <Route path="/listredux" element={<ListProductsRedux />} /> */}
                  <Route path="/new" element={<ProductForm new={true} />} />
                  <Route
                    path="/cartredux"
                    element={
                      <AuthenticateGuard>
                        <ShoppingCartRedux />
                      </AuthenticateGuard>
                    }
                  />
                  <Route path="/login" element={<Login />} />
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
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
