import { render, cleanup ,afterEach} from "@testing-library/react";
import { useState } from "react";
import ContextStore from "../../context/context-store";
import ShoppingCart from "./shopping-cart";

afterEach(cleanup);

const renderWithContext = component => {
    const [store,setStore] = useState([{name:'ip9'},{name:'redmi'}]);
    return {
        ...render(
            <ContextStore.Provider value={{store,setStore}}>
                {component}
            </ContextStore.Provider>
        )
    }
}

it('context should be array',()=>{
    const {getAllByTestId} = renderWithContext(<ShoppingCart />);
    console.log(getAllByTestId('product-name'))
    expect(getAllByTestId('product-name')).toBeTruthy;
});