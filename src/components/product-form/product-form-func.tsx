import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { get, post, put } from "../../services/base-api";
import { required, isNumber, isInteger } from "../../services/validation";
import Controls from "../control/control";
import PortalContainer from "../portal-container/portal-container";
import Toast from "../toast/toast";
import Spinner from "../spinner/spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";

const ProductFormFunc = ({ isNew = false }) => {
  const titleRef = useRef<HTMLInputElement>();
  const stockRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const discountPercentageRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();
  const ratingRef = useRef<HTMLInputElement>();

  const formConfig = [
    { name: "title", validations: [required], ref: titleRef },
    { name: "stock", validations: [required, isInteger], ref: stockRef },
    { name: "description", validations: [required], ref: descriptionRef },
    {
      name: "discountPercentage",
      validations: [required, isNumber],
      ref: discountPercentageRef,
    },
    { name: "price", validations: [required, isNumber], ref: priceRef },
    { name: "rating", validations: [required, isNumber], ref: ratingRef },
  ];

  function initForm() {
    return formConfig.map((config) => ({
      name: config.name,
      value: "",
      errorMessage: "",
      validations: config.validations,
      ref: config.ref,
    }));
  }

  const [thumbnail, setThumbnail] = useState("");
  const [isToastOn, setIsToastOn] = useState(false);
  const [isOpenSpinner, setIsOpenSpinner] = useState(false);
  const [form, setForm] = useState(initForm());
  const { productId = "" } = useParams();
  const addProduct = useMutation(() => {
    const body = getFormValue();
    return post("products/add", body);
  },
  {
    onSuccess: () => {
      console.log('onSuccess')
      // showAndHideToast();
      setIsToastOn(true);
      console.log('isToastOn',isToastOn)
    },
  });
  const location = useLocation();
  const navigate = useNavigate();

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

  const patchDataToForm = (res: any) => {
    Object.keys(res).forEach((key) => {
      const control = form.find((formControl) => formControl.name === key);
      if (control) {
        control.value = res[key];
      }
    });
    setForm(form);
  };

  const validateControl = (name: string, value: string) => {
    const config = formConfig.find((control) => control.name === name);
    if (!config) return "";
    let errorMsg = "";
    config.validations.forEach((fn) => {
      errorMsg += fn(value);
    });
    return errorMsg;
  };

  const memoizedhandleInputChange = useCallback((event: any) => {
    handleInputChange(event);
  }, []);

  const handleInputChange = (event: any) => {
    const { target: { name = "", value = "" } = {} } = event;
    const control = form.find((control) => control.name === name);
    if (!control) return;
    const errorMsg = validateControl(name, value);
    control.value = value;
    control.errorMessage = errorMsg;
    setForm([...form]);
  };

  const createInputControl = () => {
    return form.map((control, index) => {
      return (
        <Fragment key={index}>
          <div className="w-full text-left">
            <Controls
              label={`${control.name[0].toUpperCase()}${control.name.substring(
                1
              )}`}
              name={control.name}
              value={control.value}
              handleChange={memoizedhandleInputChange}
              errorMessage={control.errorMessage}
              formRef={control.ref}
            />
          </div>
        </Fragment>
      );
    });
  };

  const getFormValue = () => {
    const obj: any = {};
    form.forEach((control: any) => {
      obj[control.name] = control.value;
    });
    return obj;
  };

  const validateForm = () => {
    form.forEach((control) => {
      control.errorMessage = validateControl(control.name, control.value);
      if (control.ref.current && control.errorMessage) {
        control.ref.current.focus();
      }
    });
    setForm([...form]);
    return form.every((control) => !control.errorMessage);
  };

  const showAndHideToast = () => {

    setIsToastOn(!isToastOn);
  };

  const save = async () => {
    // const isValidForm = validateForm();
    // if (!isValidForm) return;
    // const body = getFormValue();
    // if (productId) {
    //   import('')
    //   put(`products/${productId}`, body).then((res) => {
    //     showAndHideToast();
    //     getSelectedProduct();
    //   });
    // } else {
    //   post("products/add", body).then((res) => {
    //     showAndHideToast();
    //   });
    // }

    const isValidForm = validateForm();
    if (!isValidForm) return;
    const body = getFormValue();
    if (productId) {
      const { put } = await import("../../services/base-api");

      put(`products/${productId}`, body).then((res) => {
        showAndHideToast();
        getSelectedProduct();
      });
      // addProduct.mutate();
    } else {
      // const { post } = await import("../../services/base-api");
      // post("products/add", body).then((res) => {
      //   showAndHideToast();
      // });
      addProduct.mutate();
    }
  };
  return (
    <div>
      <Spinner isOpenSpinner={isOpenSpinner}></Spinner>
      <Toast
        isToastOn={isToastOn}
        message={isNew ? "Add successfully" : "Update successfully"}
      ></Toast>

      <div className="w-full flex">
        {!isNew && <img className="w-1/3 h-80" alt="" src={thumbnail} />}

        <div className={`${isNew ? "w-full" : "w-2/3"} -mx-3 mb-6 pl-3`}>
          {createInputControl()}
        </div>
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
