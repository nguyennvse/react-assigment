import React from "react";
import style from "./spinner.module.scss";
export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.isOpenSpinner && (
        // <div className="modal flex items-center justify-center fixed top-0 left-0 w-full h-full backdrop-opacity-10 backdrop-invert bg-white/30">
        //   <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full text-blue-600">
        //   </div>
        // </div>
        <div className="modal flex items-center justify-center fixed top-0 left-0 w-full h-full backdrop-opacity-10 backdrop-invert bg-white/30">
          <div className="relative">
            <div className={style.dragon}>
              <div className={style.body}></div>
              <div className={style["horn-left"]}></div>
              <div className={style["horn-right"]}></div>
              <div className={`${style["eye"]}  ${style["left"]}`}></div>
              <div className={`${style["eye"]}  ${style["right"]}`}></div>
              <div className={`${style["blush"]} ${style["b-left"]}`}></div>
              <div className={`${style["blush"]} ${style["b-right"]}`}></div>
              <div className={style["mouth"]}></div>
              <div className={style["tail-sting"]}></div>
            </div>
            <div className={style["fire-wrapper"]}>
              <div className={style["fire"]}></div>
            </div>
            <div className={style["progress"]}>
              <div className={style["outer"]}>
                <div className={style["inner"]}></div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
