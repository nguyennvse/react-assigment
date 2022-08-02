import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSignedInUser } from "../../redux/local-storage-slide";
import { axiosInstance } from "../../services/base-api";
import { getFormValue } from "../../services/utility";
import { required } from "../../services/validation";
import style from "./login.module.scss";

const Login = () => {
  const formConfig = [
    {
      name: "username",
      validations: [required],
      placeHolder: "ID",
      type: "text",
    },
    {
      name: "password",
      validations: [required],
      placeHolder: "Password",
      type: "password",
    },
  ];
  // const token = useSelector(state => state.authenToken.value);
  const initForm = () => {
    return formConfig.map((control) => ({
      value: "",
      error: "",
      ...control,
    }));
  };
  const dispatch = useDispatch();
  const [form, setForm] = useState(initForm());

  const handleInputChange = (event) => {
    const { target: { name = "", value = "" } = {} } = event;
    const control = form.find((control) => control.name === name);
    if (!control) return;
    const errorMsg = validateControl(name, value);
    control.value = value;
    control.errorMessage = errorMsg;
    setForm([...form]);
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

  const logInSubmit = () => {
    // post("/auth/login").then(res => console.log(res));
    // dispatch(setAuthenToken("THIS IS TOKENNNNNNNNNN"));
    // axios
    //   .post("http://localhost:4000/users/authenticate", {
    //     username: "test",
    //     password: "test",
    //   })
    //   .then((res) => console.log(res));
    const { username, password } = getFormValue(form);
    axios
      .post("http://localhost:4000/users/login", {
        username,
        password,
      })
      .then((res) => {
        const { data: { token = "", refreshToken = "" } = {} } = res;
        dispatch(setSignedInUser({name:username}));
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("authenToken", token);
        window.localStorage.setItem("refreshToken", refreshToken);
      })
      .catch((err) => console.error(err));
    // axiosInstance
    //   .post("/users/login", {
    //     username,
    //     password,
    //   })
    //   .then((res) => {
    //     const { data: { token = "", refreshToken = "" } = {} } = res;
    //     if (res.data) {
    //       // dispatch(setAuthenToken(token));
    //       // dispatch(setRefreshToken(refreshToken));
    //       window.localStorage.setItem('authenToken',token)
    //       window.localStorage.setItem('refreshToken',refreshToken)
    //     }
    //   })
    //   .catch((err) => console.error(err));
  };
  const testCall = () => {
    axiosInstance
      .post("/users/test")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };
  const createAcouunt = () => {
    const { username, password } = getFormValue(form);
    axios.post("http://localhost:4000/users/createUser", {
      username,
      password,
      name: username,
    });
  };
  const logout = () => {
    // post("/auth/login").then(res => console.log(res));
    // dispatch(setAuthenToken(false));
  };

  return (
    <div className={style.container}>
      <div className={style.top}></div>
      <div className={style.bottom}></div>
      <div className={style.center}>
        {form.length &&
          form.map((control) => (
            <input
              name={control.name}
              type={control.type}
              placeholder={control.placeHolder}
              value={control.value}
              onChange={handleInputChange}
            />
          ))}
        <h2>&nbsp;</h2>
        <div className="flex">
          <button
            onClick={() => logInSubmit()}
            type="button"
            className="inline-block w-24 px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Login
          </button>
          <button
            onClick={() => logout()}
            type="button"
            className="inline-block ml-2 w-24 px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Logout
          </button>
          <button
            onClick={() => testCall()}
            type="button"
            className="inline-block ml-2 w-24 px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Create Acouunt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
