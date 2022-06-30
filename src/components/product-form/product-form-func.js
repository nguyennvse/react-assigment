import React, { Fragment, useEffect, useState } from "react";
import { get, post, put } from "../../services/base-api";
import { required, isNumber, isInteger } from "../../services/validation";
import Controls from "../control/control";
import PortalContainer from "../portal-container/portal-container";
import Toast from "../toast/toast";
import Spinner from "../spinner/spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProductFormFunc = ({ isNew = false }) => {
  const formConfig = [
    { name: "title", validations: [required] },
    { name: "stock", validations: [required, isInteger] },
    { name: "description", validations: [required] },
    { name: "discountPercentage", validations: [required, isNumber] },
    { name: "price", validations: [required, isNumber] },
    { name: "rating", validations: [required, isNumber] },
  ];

  const initForm = () => {
    return formConfig.map((config) => ({
      name: config.name,
      value: "",
      errorMessage: "",
      validations: config.validations,
    }));
  };

  const [thumbnail, setThumbnail] = useState("");
  const [isToastOn, setIsToastOn] = useState("");
  const [isOpenSpinner, setIsOpenSpinner] = useState("");
  const [form, setForm] = useState(initForm());
  const { productId = '' } = useParams();
  const location=useLocation();
  const navigate=useNavigate();

  useEffect(() => {
    if (productId) getSelectedProduct();
  }, []);

  useEffect(() => {
    setForm(initForm());
  }, [isNew]);

  const getSelectedProduct = () => {
    if (productId) {
      setIsOpenSpinner(true);
      get(`products/${productId}`).then((res) => {
        setIsOpenSpinner(false);
        const {
          data: {
            title = "",
            stock = 0,
            description = "",
            thumbnail = "",
            discountPercentage = 0,
            price = "",
            rating = "",
          } = {},
        } = res;
        setThumbnail(thumbnail);
        patchDataToForm({
          title,
          stock,
          description,
          discountPercentage,
          price,
          rating,
        });
      });
    } else {
      setForm(initForm());
    }
  };

  const patchDataToForm = (res) => {
    Object.keys(res).forEach((key) => {
      const control = form.find((formControl) => formControl.name === key);
      if (control) {
        control.value = res[key];
      }
    });
    setForm(form);
  };

  const validateControl = (name, value) => {
    const config = formConfig.find((control) => control.name === name);
    if (!config) return "";
    let errorMsg = "";
    config.validations.forEach((fn) => {
      errorMsg += fn(value);
    });
    return errorMsg;
  };

  const handleInputChange = (event) => {
    const { target: { name = "", value = "" } = {} } = event;
    const control = form.find((control) => control.name === name);
    if (!control) return;
    const errorMsg = validateControl(name, value);
    control.value = value;
    control.errorMessage = errorMsg;
    setForm([...form]);
  };

  const createInputControl = () => {
    // return formConfig.map((config, index) => {
    // const control = form.find((control) => control.name === config.name);
    return form.map((control, index) => {
      return (
        <Fragment key={index}>
          <div className="w-full text-left px-3 mb-6">
            <Controls
              label={`${control.name[0].toUpperCase()}${control.name.substring(
                1
              )}`}
              name={control.name}
              value={control.value}
              handleChange={handleInputChange}
              errorMessage={control.errorMessage}
            />
          </div>
        </Fragment>
      );
    });
  };

  const getFormValue = () => {
    const obj = {};
    form.forEach((control) => {
      obj[control.name] = control.value;
    });
    return obj;
  };

  const validateForm = () => {
    form.forEach((control) => {
      control.errorMessage = validateControl(control.name, control.value);
    });
    setForm([...form]);
    return form.every((control) => !control.errorMessage);
  };

  const showAndHideToast = () => {
    setIsToastOn(!isToastOn);
  };
  const save = () => {
    const isValidForm = validateForm();
    if (!isValidForm) return;
    const body = getFormValue();
    if (productId) {
      put(`products/${productId}`, body).then((res) => {
        showAndHideToast();
        getSelectedProduct();
      });
    } else {
      post("products/add", body).then((res) => {
        showAndHideToast();
      });
    }
  };
  return (
    <div>
      <PortalContainer>
        <Spinner isOpenSpinner={isOpenSpinner}></Spinner>
      </PortalContainer>
      <PortalContainer>
        <Toast
          isToastOn={isToastOn}
          message={isNew ? "Add successfully" : "Update successfully"}
        ></Toast>
      </PortalContainer>

      <div className="w-full flex mt-10 px-10">
        {!isNew && <img className="w-1/3 h-80" alt="" src={thumbnail} />}

        <div className="w-2/3 -mx-3 mb-6 pl-3">{createInputControl()}</div>
      </div>
      <div className="w-full flex mt-1 justify-end items-end pr-12">
        <button
          data-testid="save"
          onClick={() => save()}
          className="h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProductFormFunc;
