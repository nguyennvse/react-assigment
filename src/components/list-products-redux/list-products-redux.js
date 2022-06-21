import React, { Fragment, useEffect } from "react";
import { get } from "../../services/base-api";
import ProductCard from "../product-card/product-card";
import ContextStore from "../../context/context-store";
import { getProductsThunk } from "../../redux/selected-products-slide";
import { useDispatch, useSelector } from "react-redux/es/exports";
export const ListProductsRedux = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.selectedProducts.fetchedList);
  useEffect(() => {
     dispatch(getProductsThunk());
  }, []);

  return (
    <div className="mt-8">
      
       {list.map((product) => (
        <Fragment key={product.id}>
          <ProductCard {...product} isReduxList={true}></ProductCard>
        </Fragment>
      ))} 
      
    </div>
  );
};
