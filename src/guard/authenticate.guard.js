import { useEffect } from "react";
import { useSelector } from "react-redux"
import {
    Navigate,
  } from "react-router-dom";
const AuthenticateGuard = ({children}) =>{
    const token = window.localStorage.getItem('authenToken');
    useEffect(()=>{console.log('tokennnn',token)})
    if(!token){
        return <Navigate to="/login" replace></Navigate>
    }
    return children
}

export default AuthenticateGuard