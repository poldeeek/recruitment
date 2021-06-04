import Courses from '../Courses';
import { render } from '@testing-library/react';

jest.mock('../../utils/fetcher', () => {
  return {
    fetcher: jest.fn().mockImplementation(() => {
      return 'Some data';
    }),
    readData: jest.fn(),
  };
});

jest.mock('../CollapsibleTable', () => {
  const CollapsibleTable = () => <div>CollapsibleTable</div>;
  return CollapsibleTable;
});

test('Basic redner', () => {
  const component = render(<Courses />);
  expect(component.baseElement).toMatchSnapshot();
});
