import style from "./sidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenSideBar } from "../../redux/is-open-side-bar";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = ({ theme, switchTheme }:{theme:boolean, switchTheme:any}) => {
  const linkArr = [
    { label: "List", path: "/", icon: "fa-solid fa-list" },
    { label: "New", path: "/editfunc", icon: "fa-solid fa-circle-plus" },
    {
      label: "Cart",
      path: "/cartredux",
      icon: "fa-solid fa-cart-shopping",
    },
    {
      label: "Chart",
      path: "/chart",
      icon: "fa-solid fa-cart-shopping",
    },
    {
      label: "D3 Chart",
      path: "/d3chart",
      icon: "fa-solid fa-cart-shopping",
    },
    {
      label: "Styled Component",
      path: "/style",
      icon: "fa-solid fa-cart-shopping",
    },
  ];
  const isOpenSideBar = useSelector((state:any) => state.isOpenSideBar.value);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div
      className={`${style["sidebar"]} ${
        isOpenSideBar ? style.expand : style.collapse
      } 
      relative`}
    >
      <div
        className={style.toggleicon}
        onClick={() => dispatch(setIsOpenSideBar(!isOpenSideBar))}
      >
        <i
          className={`${
            isOpenSideBar
              ? "fa-solid fa-circle-arrow-left"
              : "fa-solid fa-circle-arrow-right"
          }`}
        ></i>
      </div>
      <div className={`${style["logo"]} flex overflow-hidden `}>
        <NavLink to="/">
          <div className={`${style["logo-container"]}`}>
            <i className="fa-solid fa-house"></i>
          </div>
        </NavLink>

        <div
          className={`${style.projectname} ${
            isOpenSideBar ? "show" : "hidden"
          } ${style.content}`}
        >
          <h2>HCL Corp.</h2>
          <h2>HCL Corp.</h2>
        </div>
      </div>
      {linkArr.map((link, i) => (
        <div className="mt-3 px-3 overflow-hidden" key={i}>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : ``)}
            to={link.path}
          >
            <div className="flex">
              <div className={`${style["logo-container"]}`}>
                <i className={link.icon}></i>
              </div>
              <p
                className={`${style.linkName} ${
                  isOpenSideBar ? "show" : "hidden"
                } ml-3`}
              >
                {link.label}
              </p>
            </div>
          </NavLink>
        </div>
      ))}

      <div className="mt-3 px-3 overflow-hidden">
        <NavLink
          className={({ isActive }) => (isActive ? style.active : ``)}
          to="/login"
        >
          <div className="flex">
            <div className={`${style["logo-container"]}`}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              {/* <i class="fa-solid fa-arrow-right-from-bracket"></i> */}
            </div>
            <p
              className={`${style.linkName} ${
                isOpenSideBar ? "show" : "hidden"
              } ml-3`}
            >
              Sign in
            </p>
          </div>
        </NavLink>
      </div>

      <div className="mt-3 px-3">
        <div className="flex justify-left">
          <div className="form-check form-switch">
            <input
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={switchTheme}
            />
            <label
              className={`form-check-label inline-block ${
                isOpenSideBar ? "show" : "hidden"
              }`}
              htmlFor="flexSwitchCheckDefault"
            >
              {theme ? "Dark" : "Light"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
