import Header from "./header/header";
import { Outlet } from "react-router-dom";
import React from "react";
import style from "./layout.module.scss";
import SideBar from "./sidebar/sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "./breadcrumb/breadcrumb";
const Layout = () => {
  const [theme, setTheme] = useState(true);
  const isOpenSideBar = useSelector((state) => state.isOpenSideBar.value);
  const switchTheme = () => {
    setTheme((previousState) => !previousState);
  };

  return (
    <div className={`App ${theme ? style.light : style.dark} flex`}>
      <SideBar theme={theme} switchTheme={switchTheme} />
      <div
        className={`h-screen overflow-auto p-5  ${
          isOpenSideBar ? style["content-expand"] : style["content-collapse"]
        }`}
      >
        <div className="m-auto w-4/5">
          <Breadcrumb />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
