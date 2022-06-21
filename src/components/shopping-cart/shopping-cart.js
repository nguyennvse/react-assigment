import { Fragment, useContext, useEffect } from "react";
import ContextStore from "../../context/context-store";
import ProductCard from "../product-card/product-card";

const ShoppingCart = () => {
  const { value } = useContext(ContextStore);
  useEffect(() => {
    console.log("value", value);
  }, []);
  return (
    <div>
      {value.map((v, index) => (
        <Fragment key={index}>
          <ProductCard isReduxList={false} isShoppingCart={true} {...v}></ProductCard>
        </Fragment>
      ))}
    </div>
  );
};

export default ShoppingCart;
