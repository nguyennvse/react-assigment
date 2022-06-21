import React from "react";
import {NavLink} from 'react-router-dom';

export default class Header extends React.Component {
  constructor() {super()}

  render() {
    return <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                   to={`/`}
                    className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                   
                  >
                    List
                  </NavLink>

                  <NavLink
                     to={`/new`}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    New
                  </NavLink>

                  <NavLink
                     to={`/cart`}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Shopping Cart
                  </NavLink>
                  <NavLink
                     to={`/listredux`}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    List Product Redux
                  </NavLink>
                  <NavLink
                     to={`/cartredux`}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Shopping Cart Redux
                  </NavLink>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>;
  }
}
