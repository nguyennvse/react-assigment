import React, { Fragment } from "react";
import withRouter from "../../hoc/with-router";
import { get, post, put } from "../../services/base-api";
import {
  required,
  isEmail,
  isNumber,
  isInteger,
} from "../../services/validation";
import Controls from "../control/control";
import PortalContainer from "../portal-container/portal-container";
import Toast from "../toast/toast";
import Spinner from "../spinner/spinner";
class ProductForm extends React.Component {
  #productId;
  #formConfig = [
    { name: "title", validations: [required] },
    { name: "stock", validations: [required, isInteger] },
    { name: "description", validations: [required] },
    { name: "discountPercentage", validations: [required, isNumber] },
    { name: "price", validations: [required, isNumber] },
    { name: "rating", validations: [required, isNumber] },
  ];
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      thumbnail: "",
      images: "",
      form: this.initForm(),
      isToastOn: false,
      isOpenSpinner: false,
    };
    const { router: { params: { productId = "" } = {} } = {} } = this.props;
    this.#productId = productId || "";

  }

  initForm = () => {
    return this.#formConfig.map((config) => ({
      name: config.name,
      value: "",
      errorMessage: "",
      validations: config.validations,
    }));
  };
  
  componentDidMount() {
    this.getSelectedProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.new != this.props.new) {
      this.setState({ form: this.initForm() });
    }
  }
  getSelectedProduct = () => {
    if (!this.props.new) {
      this.setState({ isOpenSpinner: true });
      get(`products/${this.#productId}`).then((res) => {
        this.setState({ isOpenSpinner: false });
        const {
          data: {
            id = 0,
            title = "",
            stock = 0,
            description = "",
            thumbnail = "",
            discountPercentage = 0,
            images = "",
            price = "",
            rating = "",
          } = {},
        } = res;
        this.setState({
          id: id,
          thumbnail: thumbnail,
          images: images,
        });
        this.patchDataToForm({
          title,
          stock,
          description,
          discountPercentage,
          price,
          rating,
        });
      });
    } else {
      this.setState({ form: this.initForm() });
    }
  };

  patchDataToForm = (res) => {
    const { form = [] } = this.state;

    Object.keys(res).forEach((key) => {
      const control = form.find((formControl) => formControl.name === key);
      if (control) {
        control.value = res[key];
        // this.validateControl(key,res[key]);
      }
    });
    this.setState({ form: form });
  };

  validateControl = (name, value) => {
    const config = this.#formConfig.find((control) => control.name === name);
    if (!config) return "";
    let errorMsg = "";
    config.validations.forEach((fn) => {
      errorMsg += fn(value);
    });
    return errorMsg;
  };

  handleInputChange = (event) => {
    const { target: { name = "", value = "" } = {} } = event;
    let { form = [] } = this.state;
    const control = form.find((control) => control.name === name);
    if (!control) return;
    const errorMsg = this.validateControl(name, value);
    control.value = value;
    control.errorMessage = errorMsg;
    this.setState(() => ({ form: form }));
  };

  createInputControl = () => {
    return this.#formConfig.map((config, index) => {
      const control = this.state.form.find(
        (control) => control.name === config.name
      );
      return (
        <Fragment key={index}>
          <div className="w-full text-left px-3 mb-6">
            <Controls
              label={`${config.name[0].toUpperCase()}${config.name.substring(
                1
              )}`}
              name={control.name}
              value={control.value}
              handleChange={this.handleInputChange}
              errorMessage={control.errorMessage}
            />
          </div>
        </Fragment>
      );
    });
  };

  getFormValue = () => {
    const obj = {};
    this.state.form.forEach((control) => {
      obj[control.name] = control.value;
    });
    return obj;
  };

  validateForm =  () => {
    const form = this.state.form;
    form.forEach((control) => {
      control.errorMessage = this.validateControl(control.name, control.value);
    });
    this.setState({ form: form });
    return this.state.form.every((control) => !control.errorMessage);
  };

  save = () => {
    const isValidForm = this.validateForm();
    if (!isValidForm) return;
    const body = this.getFormValue();
    if (this.#productId) {
      put(`products/${this.#productId}`, body).then((res) => {
        this.showAndHideToast();
        this.getSelectedProduct();
      });
    } else {
      post("products/add", body).then((res) => {
        this.showAndHideToast();
      });
    }
  };

  showAndHideToast = () => {
    this.setState({ isToastOn: true });
  }

  render() {
    const toastMessage = this.props.new
      ? "Add successfully"
      : "Update successfully";
    return (
      <div>
        <PortalContainer>
          <Spinner isOpenSpinner={this.state.isOpenSpinner}></Spinner>
        </PortalContainer>
        <PortalContainer>
          <Toast
            isToastOn={this.state.isToastOn}
            message={toastMessage}
          ></Toast>
        </PortalContainer>

        <div className="w-full flex mt-10 px-10">
          {this.#productId && (
            <img className="w-1/3 h-80" alt="" src={this.state.thumbnail} />
          )}

          <div className="w-2/3 -mx-3 mb-6 pl-3">
            {this.createInputControl()}
          </div>
        </div>
        <div className="w-full flex mt-1 justify-end items-end pr-12">
          <button data-testid="save"
            onClick={()=> this.save()}
            className="h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductForm);
