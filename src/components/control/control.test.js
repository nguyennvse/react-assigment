import { render, cleanup, fireEvent } from "@testing-library/react"
import Controls from "./control";

afterEach(cleanup);

it('should take a snapshot',()=>{
    const { asFragment } = render(<Controls/>)
    expect(asFragment(<Controls/>)).toMatchSnapshot();
});

it('should be control label',()=>{
    const {getByTestId} = render(<Controls label='Name'/>);
    expect(getByTestId('label')).toHaveTextContent('Name');
})
