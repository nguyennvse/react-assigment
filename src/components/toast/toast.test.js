import { render } from "@testing-library/react";
import Toast from "./toast";

it('should render',()=>{
  const {container} = render(<Toast/>);
  expect(container).toBeTruthy();
});