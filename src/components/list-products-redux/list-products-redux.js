import React, { Fragment, useEffect } from "react";
import ProductCard from "../product-card/product-card";
import { getProductsThunk } from "../../redux/selected-products-slide";
import { useDispatch, useSelector } from "react-redux";
import PortalContainer from "../portal-container/portal-container";
import Spinner from "../spinner/spinner";

export const ListProductsRedux = () => {
  const dispatch = useDispatch();
  const {fetchedList:list, isLoading} = useSelector(state => state.selectedProducts);
  useEffect(() => {
     dispatch(getProductsThunk());
  }, []);

  return (
    <div className="mt-8">
      <PortalContainer><Spinner isOpenSpinner={isLoading}></Spinner></PortalContainer>
       {list.map((product) => (
        <Fragment key={product.id}>
          <ProductCard {...product} isReduxList={true}></ProductCard>
        </Fragment>
      ))} 
      
    </div>
  );
};
