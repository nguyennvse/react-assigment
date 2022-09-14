import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../product-card/product-card";

const ShoppingCartRedux = () => {
  const value = useSelector((state:any) => state.selectedProducts.value);
  return (
    <div>
      {value.map((v:any, index:number) => (
        <Fragment key={index}>
          <ProductCard isReduxShoppingCart={true} {...v}></ProductCard>
        </Fragment>
      ))}
    </div>
  );
};

export default ShoppingCartRedux;
