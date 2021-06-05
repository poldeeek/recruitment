import '@testing-library/jest-dom/extend-expect';
import Courses from '../Courses';
import { render, waitForElementToBeRemoved } from '@testing-library/react';

import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig, cache } from 'swr';

jest.mock('../CollapsibleTable', () => {
  const CollapsibleTable: React.FC = () => <div>CollapsibleTable</div>;
  return CollapsibleTable;
});

const server = setupServer(
  rest.get(
    'https://xtramile.azure-api.net/stats/lukaszcoding',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(data));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
afterEach(() => cache.clear());

test('Basic render', async () => {
  const component = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <Courses />
    </SWRConfig>
  );
  await waitForElementToBeRemoved(() => component.getByTitle('loader'));

  expect(component.baseElement).toMatchSnapshot();
});

test('handles errors', async () => {
  server.use(
    rest.get(
      'https://xtramile.azure-api.net/stats/lukaszcoding',
      (_req, res, ctx) => {
        return res(ctx.status(404));
      }
    )
  );

  const component = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <Courses />
    </SWRConfig>
  );
  const element = await component.findByText(/Something went wrong/i);
  expect(element).toBeInTheDocument();
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

const data = [
  {
    project: 'Project1',
    course: 'Course1',
    person: 'Paweł',
    email: 'email@wp.pl',
    department: '',
    location: '',
    courseStartedDate: '',
    openedLessonsCount: '0',
    completedDate: '',
    completedLessonsCount: 0,
    totalLessonsCount: 1,
    haveNotStarted: '1',
    notOnSchedule: '1',
    haveStarted: '0',
    quizScore: 0,
    quizScoreTotal: 1,
    certificateTitle: null,
  },
  {
    project: 'Project2',
    course: 'Course2',
    person: 'Paweł2',
    email: 'email2@wp.pl',
    department: '',
    location: '',
    courseStartedDate: '2021-03-09 10:02:35',
    openedLessonsCount: '1',
    completedDate: '2021-03-09 10:05:03',
    completedLessonsCount: 1,
    totalLessonsCount: 1,
    haveNotStarted: '0',
    notOnSchedule: '0',
    haveStarted: '1',
    quizScore: 0,
    quizScoreTotal: 0,
    certificateTitle: null,
  },
  {
    project: 'Project3',
    course: 'Course2',
    person: 'Paweł3',
    email: 'email3@wp.pl',
    department: '',
    location: '',
    courseStartedDate: '2021-03-09 10:02:35',
    openedLessonsCount: '1',
    completedDate: '2021-03-09 10:05:03',
    completedLessonsCount: 1,
    totalLessonsCount: 1,
    haveNotStarted: '0',
    notOnSchedule: '0',
    haveStarted: '1',
    quizScore: 0,
    quizScoreTotal: 0,
    certificateTitle: null,
  },
  {
    project: 'Project3',
    course: 'Course2',
    person: 'Paweł1',
    email: 'email1@wp.pl',
    department: '',
    location: '',
    courseStartedDate: '2021-03-09 10:02:35',
    openedLessonsCount: '1',
    completedDate: '2021-03-09 10:05:03',
    completedLessonsCount: 1,
    totalLessonsCount: 1,
    haveNotStarted: '0',
    notOnSchedule: '0',
    haveStarted: '1',
    quizScore: 0,
    quizScoreTotal: 0,
    certificateTitle: null,
  },
];
