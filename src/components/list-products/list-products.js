import React, { Fragment, Suspense } from "react";
// import BaseApiService from "../../services/base-api";
import { get } from "../../services/base-api";
import ProductCard from "../product-card/product-card";
import ContextStore from "../../context/context-store";
import Spinner from "../spinner/spinner";
import PortalContainer from "../portal-container/portal-container";

export default class ListProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      isOpenSpinner: false,
    };
  }
  static contextType = ContextStore;
  componentDidMount() {
    this.setState({ isOpenSpinner: true });
    get("products").then((res) => {
      this.setState({ productList: res.data.products });
      this.setState({ isOpenSpinner: false });
    });
  }

  render() {
    return (
      <div className="mt-8">
        <Suspense fallback={<p>loading...</p>}>
          {this.state.productList.map((product) => (
            <Fragment key={product.id}>
              <ProductCard
                isReduxList={false}
                isList={true}
                {...product}
              ></ProductCard>
            </Fragment>
          ))}
        </Suspense>

        {/* <PortalContainer>
          <Spinner isOpenSpinner={this.state.isOpenSpinner}></Spinner>
        </PortalContainer> */}
      </div>
    );
  }
}
