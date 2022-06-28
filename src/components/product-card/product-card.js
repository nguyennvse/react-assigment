import React, { Fragment, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from "../../context/context-store";
import { decrement, increment } from "../../redux/selected-products-slide";
import { useDispatch } from "react-redux";
import style from './product-card.module.scss';

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
  const [value, setContext] = useContext(ContextStore);
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
    if (!quant) {
      setContext(value.filter((v) => v.id !== id));
    } else {
      existedProduct.quant = quant;
      setContext(value);
    }
  };
  return (
    <div className="flex w-4/5 mx-auto shadow-lg mt-2">
      <img className="w-1/3" alt="" src={thumbnail} />
      <div className={`w-2/3 ${style['sm-text']}`}>
        <div className={`px-4 text-left pt-2 w-full ${style['card-content']}`}>
          <p data-testid="product-name">Name : {title}</p>
          <p data-testid="description">Description : {description}</p>
          <p data-testid={isShoppingCart || isReduxShoppingCart ? `Quantity` : `Stock`}>
            {isShoppingCart || isReduxShoppingCart ? `Quantity` : `Stock`} :{" "}
            {isShoppingCart || isReduxShoppingCart ? quant : stock}
          </p>
        </div>
        <div className={`flex h-auto justify-end items-end w-full min-w-fit ${style['sm-text']} ${style['btn-container']}`}>

        {isList && (
          <Fragment>
            <button data-testid="navigate"
              onClick={() => navigate(`/edit/${id}`)}
              className={` bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ${style['sm-button']}`}
            >
              View Detail
            </button>

            <button data-testid="addProductToContext"
              onClick={() => addProductToContext()}
              className={` bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ${style['sm-button']}`}
            >
              Add to cart
            </button>
          </Fragment>
        )}
          {isReduxList && (
            <Fragment>
              <button data-testid="navigate"
                onClick={() => navigate(`/edit/${id}`)}
                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ${style['sm-button']}`}
              >
                View Detail
              </button>

              <button data-testid="addProductToRedux"
                onClick={() => addProductToRedux()}
                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ${style['sm-button']}`}
              >
                Add to cart
              </button>
            </Fragment>
          )}

          {isShoppingCart && (
            <Fragment>
              <button data-testid="editQuant"
                onClick={() => editQuant(1)}
                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ${style['sm-button']}`}
              >
                Increase
              </button>
              <button data-testid="editQuantDes"
                onClick={() => editQuant(-1)}
                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ${style['sm-button']}`}
              >
                Decrease
              </button>
            </Fragment>
          )}

          {isReduxShoppingCart && (
            <Fragment>
              <button data-testid="editQuantRedux"
                onClick={() =>
                  dispatch(
                    increment({ id, title, description, thumbnail, quant: 1 })
                  )
                }
                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ${style['sm-button']}`}
              >
                Increase
              </button>
              <button data-testid="editQuantDesRedux"
                onClick={() =>
                  dispatch(
                    decrement({ id, title, description, thumbnail, quant: 1 })
                  )
                }
                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ${style['sm-button']}`}
              >
                Decrease
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
