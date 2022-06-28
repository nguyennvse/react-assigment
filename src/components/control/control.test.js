import { render, cleanup, fireEvent } from "@testing-library/react"
import Controls from "./control";

it('should take a snapshot',()=>{
    const { asFragment } = render(<Controls/>)
    expect(asFragment(<Controls/>)).toMatchSnapshot();
});

it('should be control label',()=>{
    const {getByTestId} = render(<Controls label='Name'/>);
    expect(getByTestId('label')).toHaveTextContent('Name');
})

it('should be control label',()=>{
    const {getByTestId,container} = render(<Controls label='Name'/>);
    fireEvent.keyUp(getByTestId('control'))
    expect(container).toBeTruthy();
})
