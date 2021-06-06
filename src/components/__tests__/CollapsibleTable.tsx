import '@testing-library/jest-dom/extend-expect';
import CollapsibleTable from '../CollapsibleTable';
import { render } from '@testing-library/react';
import { ICourse } from '../../types';

jest.mock('../Row.tsx', () => {
  const Row: React.FC<ICourse> = () => (
    <tr>
      <td>Course</td>
    </tr>
  );
  return Row;
});

const props = [
  {
    course: 'Course1',
    openedLessonsCount: 8,
    projects: [],
  },
  {
    course: 'Course2',
    openedLessonsCount: 1,
    projects: [],
  },
];

test('Basic render', () => {
  const component = render(<CollapsibleTable courses={props} />);
  expect(component.baseElement).toMatchSnapshot();
});

test('Basic render, no courses', () => {
  const component = render(<CollapsibleTable courses={[]} />);
  expect(component.baseElement).toMatchSnapshot();
});
