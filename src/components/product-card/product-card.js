import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from "../../context/context-store";
import { decrement, increment } from "../../redux/selected-products-slide";
import { useDispatch } from "react-redux/es/exports";
const ProductCard = ({
  id = 0,
  title = "",
  stock = 0,
  description = "",
  thumbnail = "",
  quant = 0,
  isReduxList = false,
  isList = false,
  isShoppingCart = false,
  isReduxShoppingCart = false,
}) => {
  const { value, setContext } = useContext(ContextStore);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    console.log(quant)
  }, []);

  const addProductToContext = () => {
      const existedProduct = value.find((v) => v.id === id);
      if (existedProduct) {
        existedProduct.quant += 1;
      } else {
        value.push({ id, title, description, thumbnail, quant: 1 });
      }
      setContext(value);
  };

  const addProductToRedux = () => {
    dispatch(increment({ id, title, description, thumbnail, quant: 1 }));
  };

  const editQuant = (num) => {
    const existedProduct = value.find((v) => v.id === id);
    if (!existedProduct) return;
    const quant = existedProduct.quant + num;
    if(!quant){
      setContext(value.filter(v => v.id !== id))
    }else{
      existedProduct.quant = quant;
      setContext(value);
    }

  };
  return (
    <div className="flex w-4/5 mx-auto shadow-lg mt-2">
      <img className="w-1/3" alt="" src={thumbnail} />
      <div className="px-4 text-left pt-10 w-1/3">
        <p data-testid='product-name'>Name : {title}</p>
        <p>Description : {description}</p>
        <p>
          {isShoppingCart || isReduxShoppingCart? `Quantity` : `Stock`} :{" "}
          {isShoppingCart || isReduxShoppingCart ? quant : stock}
        </p>
      </div>

      {isList && (
        <div className="flex h-auto justify-end items-end p-5 w-1/3 ">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            View Detail
          </button>

          <button
            onClick={() => addProductToContext()}
            className="h-12 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add to cart
          </button>
        </div>
      )}

      {isReduxList && (
        <div className="flex h-auto justify-end items-end p-5 w-1/3 ">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            View Detail
          </button>

          <button
            onClick={() => addProductToRedux()}
            className="h-12 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add to cart
          </button>
        </div>
      )}

      {isShoppingCart && (
        <div className="flex h-auto justify-end items-end p-5 w-1/3 ">
          <button
            onClick={() => editQuant(1)}
            className="h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Increase
          </button>
          <button
            onClick={() => editQuant(-1)}
            className="h-12 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Decrease
          </button>
        </div>
      )}

      {isReduxShoppingCart && (
        <div className="flex h-auto justify-end items-end p-5 w-1/3 ">
          <button
            onClick={() =>
              dispatch(
                increment({ id, title, description, thumbnail, quant: 1 })
              )
            }
            className="h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Increase
          </button>
          <button
            onClick={() =>
              dispatch(
                decrement({ id, title, description, thumbnail, quant: 1 })
              )
            }
            className="h-12 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Decrease
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
