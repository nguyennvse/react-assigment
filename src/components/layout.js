import Header from "./header/header";
import { Outlet } from "react-router-dom";
import React from "react";
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="App">
        <Header/>
        <Outlet />
    </div>;
  }
}
