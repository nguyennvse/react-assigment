import React from "react";

 const ErrorMessage = ({msg}:{msg:string}) => {
    return <p className="text-red-600">{msg}</p>
}

export default ErrorMessage