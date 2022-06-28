import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./header";

it('should render',()=>{
    const {container} = render(
        <BrowserRouter>
          <Header/>

        </BrowserRouter>);
    expect(container).toBeTruthy();
})