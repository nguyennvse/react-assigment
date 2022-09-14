import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { BreadcrumbConstant } from "../../constant/breadcrumb.constant";
import style from './breadcrumb.module.css';

const Breadcrumb = () => {
    const initBreadcrumb = [{name:'Home',path:'/'}]
    const [list,setList] = useState(initBreadcrumb);
    const location = useLocation();
    useEffect(()=>{
      console.log('location',location)
        const {pathname} = location;
        if(pathname.slice(1)){
        // const breadcrumbConstant = BreadcrumbConstant[pathname.slice(1)] || {pathname:'/'};

        //     setList([{name:'Home',path:'/'},breadcrumbConstant])
        }else{
            setList(initBreadcrumb)
        }
        console.log('list',list)
    },[location])
    return (
    <nav className={`${style.breadcrumb} bg-grey-light rounded-md w-full`}>
      <ol className="list-reset flex">
        {list.length &&
          list.map((item, i) => (
            <li key={i}>
              {/* <NavLink className={style.link} to={item.path}> {item.name} {i !== (list.length-1) ? ' / ':''}</NavLink> */}
            </li>
          ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;