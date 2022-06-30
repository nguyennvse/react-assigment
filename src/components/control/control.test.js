import { render, cleanup, fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
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
    const change = jest.fn()
    const {getByTestId,container} = render(<Controls name={'title'} label='Name' handleChange={change}/>);
    userEvent.type(screen.getByTitle('title'), 'JavaScript')
    expect(change).toHaveBeenCalled();
})
