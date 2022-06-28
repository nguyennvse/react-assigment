import { render, waitFor} from "@testing-library/react";
import ListProducts from './list-products';
import {get} from '../../services/base-api';
jest.mock('../../services/base-api')
it('should render', async () => {
    get.mockResolvedValue({
        data: [
          {
            userId: 1,
            id: 1,
            title: 'My First Album'
          },
          {
            userId: 1,
            id: 2,
            title: 'Album: The Sequel'
          }
        ]
      });
    const {container,} = render(<ListProducts/>);
    await waitFor(()=>{expect(container).toBeTruthy();}) 
});