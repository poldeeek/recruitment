import _ from 'lodash';
import { fetcher, readData } from '../fetcher';

describe('Fetcher func', () => {
  it('Success fetch', async () => {
    const mockSuccessResponse = data;
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    const globalRef = global;

    globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const response = await fetcher('https://some-url.pl');

    expect(
      _.isEqual(JSON.stringify(response), JSON.stringify(readData(data)))
    ).toBe(true);
  });

  it('Error fetch', async () => {
    const mockFetchPromise = Promise.reject('Some error');
    const globalRef = global;

    globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const response = await fetcher('https://some-url.pl');
    expect(response).toEqual('Some error');
  });
});

describe('Read data func', () => {
  const expectedResult = [
    {
      course: 'Course1',
      openedLessonsCount: 0,
      projects: [{ project: 'Project1', completedLessonsCount: 0 }],
    },
    {
      course: 'Course2',
      openedLessonsCount: 3,
      projects: [
        { project: 'Project2', completedLessonsCount: 1 },
        { project: 'Project3', completedLessonsCount: 2 },
      ],
    },
  ];

  it('Basic', () => {
    const result = readData(data);
    expect(_.isEqual(result, expectedResult)).toBe(true);
  });

  it('Empty array', () => {
    const result = readData([]);
    expect(_.isEqual(result, [])).toBe(true);
  });
});

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
