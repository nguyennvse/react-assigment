import React, { Fragment } from "react";
// import BaseApiService from "../../services/base-api";
import {get} from "../../services/base-api";
import ProductCard from "../product-card/product-card";
import ContextStore from "../../context/context-store";

export default class ListProducts extends React.Component {
  constructor() {
    super();
    this.state = {
        productList: []
    }
  }
  static contextType = ContextStore;
  componentDidMount( ) {
    get('products').then(res => {
      this.setState({productList:res.data.products});
      }
    );
  }

  render() {
    return (<div className="mt-8">
        {this.state.productList.map(product => <Fragment key={product.id}><ProductCard isReduxList={false} isList={true} {...product}></ProductCard></Fragment>)}
    </div>);
  }
}
