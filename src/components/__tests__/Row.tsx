import '@testing-library/jest-dom/extend-expect';
import Row from '../Row';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

const props = {
  course: 'Course1',
  openedLessonsCount: 3,
  projects: [
    {
      project: 'Poroject1',
      completedLessonsCount: 3,
    },
  ],
};

/*
    Wrapper for avoid that error in tests:
    Warning: validateDOMNesting(...): <tr> cannot appear as a child of <div>.
*/
const Wrapper: React.FC = ({ children }) => {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
};

test('Basic render', () => {
  const component = render(
    <Wrapper>
      <Row course={props} />
    </Wrapper>
  );
  expect(component.baseElement).toMatchSnapshot();
});

test('Show projects', () => {
  const component = render(
    <Wrapper>
      <Row course={props} />
    </Wrapper>
  );
  const clickHanlder = component.getByRole('button');
  act(() => {
    fireEvent.click(clickHanlder);
  });
  expect(component.baseElement).toMatchSnapshot();
});
