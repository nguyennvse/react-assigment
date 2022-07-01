import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../product-card/product-card";

const ShoppingCartRedux = (prop) => {
  const value = useSelector((state) => state.selectedProducts.value);
  useEffect(()=>{
    console.log('valuevaluevaluevalue',value)
  },[]);
  return (
    <div>
      {value.map((v, index) => (
        <Fragment key={index}>
          <ProductCard isReduxShoppingCart={true} {...v}></ProductCard>
        </Fragment>
      ))}
    </div>
  );
};

export default ShoppingCartRedux;
