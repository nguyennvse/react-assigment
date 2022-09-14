import { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../product-card/product-card";

const ListComponent = () => {
  const { fetchedList: list, isLoading } = useSelector(
    (state:any) => state.selectedProducts
  );
  return (
    <div>
      {list.map((product: any) => (
        <Fragment key={product.id}>
          <ProductCard {...product} isReduxList={true}></ProductCard>
        </Fragment>
      ))}
    </div>
  );
};

export default ListComponent;
