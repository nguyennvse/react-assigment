import { render } from "@testing-library/react";
import Spinner from "./spinner";

it('should render',()=>{
  const {container} = render(<Spinner/>);
  expect(container).toBeTruthy();
});