import React, {
  Fragment,
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import { getProductsThunk } from "../../redux/selected-products-slide.js";
import { useDispatch, useSelector } from "react-redux";
// import PortalContainer from "../portal-container/portal-container";
// import Spinner from "../spinner/spinner";
// import ListComponent from "./list";
// import SpinnerSupense from "../spinner-supense/spinner";
// import { useQuery } from "react-query";
// import { get, getProducts } from "../../services/base-api";
import ProductCard from "../product-card/product-card.tsx";

const ListProductsRedux = () => {
  const dispatch = useDispatch();
  const { fetchedList: list, isLoading } = useSelector(
    (state) => state.selectedProducts
  );
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState("");
  const [showList, setShowList] = useState([]); 
  const searchValueDeffered = useDeferredValue(searchValue);

  // const {data: {data : { products}} } = useQuery(['listProduct'], getProducts)
  
  useEffect(() => {
    startTransition(() => {
      dispatch(getProductsThunk());
    });
  }, []);

  useEffect(() => {
    setShowList(list)
  }, [list]);

  useEffect(() => {
    setShowList(list.filter((item) => item.title.toLowerCase().includes(searchValueDeffered)));
  }, [searchValueDeffered]);

  return (
    <div data-testid='list-container' className="mt-8">
      {/* <PortalContainer><Spinner isOpenSpinner={isLoading}></Spinner></PortalContainer> */}
      <div className="flex justify-start items-start w-full">
        <div className="mb-3 w-full">
          {/* <label
            for="exampleFormControlInput1"
            class="form-label inline-block mb-2 text-gray-700"
          >
            Example label
          </label> */}
          <input
            type="text"
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleFormControlInput1"
            placeholder="Search product"
            value={searchValue}
            onChange={($event) => {
              setSearchValue($event.target.value);
            }}
          />
        </div>
      </div>
      {/* <p data-testid='test'>{showList[0].title}</p> */}
      {showList.map((product) => (
        <Fragment key={product.id}>
          <ProductCard {...product} isReduxList={true}></ProductCard>
        </Fragment>
      ))}
       {/* {products.map((product) => (
        <Fragment key={product.id}>
          <ProductCard {...product} isReduxList={true}></ProductCard>
        </Fragment>
      ))}  */}
    </div>
  );
};
export default ListProductsRedux;
