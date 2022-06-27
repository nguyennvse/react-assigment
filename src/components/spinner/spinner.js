import React from "react";

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.isOpenSpinner && (
        <div className="modal flex items-center justify-center fixed top-0 left-0 w-full h-full backdrop-opacity-10 backdrop-invert bg-white/30">
          <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full text-blue-600">
          </div>
        </div>
      )
    );
  }
}
