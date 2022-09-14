import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";
import React, { Suspense } from "react";
import Layout from "./components/layout";
import { store } from "./redux/store";
import ContextStore from "./context/context-store";
import AuthenticateGuard from "./guard/authenticate.guard";
import { PersistGate } from "redux-persist/integration/react";
import SpinnerSupense from "./components/spinner-supense/spinner";
import SomeChart from "./components/chart/chart";
import { QueryClient, QueryClientProvider } from "react-query";
import D3Chart from "./components/d3-chart/d3-chart.compoent";
import StyledComponent from "./components/styled-comp/styled-component";
// import ListProductsRedux from "./components/list-products-redux/list-products-redux";
// import ProductFormFunc from "./components/product-form/product-form-func";
// import ShoppingCartRedux from "./components/shopping-cart-redux/shopping-cart-redux";
// import Login from "./components/login/login";
const ProductFormFunc = React.lazy(
  () => import("./components/product-form/product-form-func")
);
const ShoppingCartRedux = React.lazy(
  () => import("./components/shopping-cart-redux/shopping-cart-redux")
);
const Login = React.lazy(() => import("./components/login/login"));
const ListProductsRedux = React.lazy(
  () => import("./components/list-products-redux/list-products-redux")
);
const queryClient = new QueryClient();
class App extends React.Component {
  state: Readonly<any>;
  constructor(props: any) {
    super(props);
    this.state = {
      context: [],
    };
  }

  updateContext = (newContext: any) => {
    this.setState({ context: newContext });
  };

  persistor = persistStore(store);
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={this.persistor}> */}
        <ContextStore.Provider
          value={[this.state.context, this.updateContext.bind(this)]}
        >
          <div className="App">
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <Suspense fallback={<SpinnerSupense />}>
                        <ListProductsRedux />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/editfunc"
                    element={
                      <Suspense fallback={<SpinnerSupense />}>
                        <ProductFormFunc isNew={true} />
                      </Suspense>
                    }
                  ></Route>
                  <Route
                    path="/editfunc/:productId"
                    element={
                      <Suspense fallback={<SpinnerSupense />}>
                        <ProductFormFunc isNew={false} />
                      </Suspense>
                    }
                  ></Route>
                  <Route
                    path="/cartredux"
                    element={
                      <Suspense fallback={<SpinnerSupense />}>
                        <AuthenticateGuard>
                          <ShoppingCartRedux />
                        </AuthenticateGuard>
                      </Suspense>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Suspense fallback={<SpinnerSupense />}>
                        <Login />
                      </Suspense>
                    }
                  />
                  <Route path="/chart" element={<SomeChart />} />
                  <Route path="/d3chart" element={<D3Chart />} />
                  <Route path="/style" element={<StyledComponent />} />

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
            </QueryClientProvider>
          </div>
        </ContextStore.Provider>
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
