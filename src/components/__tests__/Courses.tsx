import '@testing-library/jest-dom/extend-expect';
import Courses from '../Courses';
import { render, waitFor } from '@testing-library/react';

jest.mock('../CollapsibleTable', () => {
  const CollapsibleTable: React.FC = () => <div>CollapsibleTable</div>;
  return CollapsibleTable;
});

test('Basic render, fetch success', async () => {
  const component = render(<Courses />);
  await waitFor(() => component.findByText('CollapsibleTable'));
  expect(component.baseElement).toMatchSnapshot();
});

/*******************************/
/* Solution below doesn't work */
/*******************************/
/*
Why ? In my opinion:

Each of test render a separate component.
Rendered component will call the fetcher function from "../../utils/fetcher".
This function call will be the first one for that component.
That means that there will be called only the one of mock implementations for fetcher :
    .mockImplementationOnce(() => Promise.resolve('data'))

We can't get to the second (data2) or the third (error).

import { cache } from 'swr';
jest.mock('../../utils/fetcher', () => ({
  fetcher: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve('data'))
    .mockImplementationOnce(() => Promise.resolve('data2'))
    .mockImplementationOnce(() => Promise.reject('error')),
  readData: jest.fn(),
}));

afterEach(() => {
  cache.clear();
});

test('Basic render. fetch pending - the loading', async () => {
  console.log('test1');
  const component = render(<Courses />);
  await waitForElementToBeRemoved(() => component.getByTitle('loader'));
  expect(component.baseElement).toMatchSnapshot();
});

test('Basic render, fetch success', async () => {
  console.log('test2');
  const component = render(<Courses />);
  await waitFor(() => component.findByText('CollapsibleTable'));
  expect(component.baseElement).toMatchSnapshot();
});

test('Basic render, fetch error', async () => {
  console.log('test3');
  const component = render(<Courses />);
  await waitFor(() => component.findByText('Something went wrong.'));
  expect(component.baseElement).toMatchSnapshot();
});
*/
