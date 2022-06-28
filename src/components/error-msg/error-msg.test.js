import { render } from "@testing-library/react";
import ErrorMessage from "./error-msg";

it('should render',()=>{
    const {container} = render(<ErrorMessage/>);
    expect(container).toBeTruthy();
})