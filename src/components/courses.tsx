import styled from 'styled-components';
import useSWR from 'swr';

import fetcher from '../helpers/fetcher';

const Courses: React.FC = () => {
  const { data, error } = useSWR<DataTypes>(
    'https://xtramile.azure-api.net/stats/lukaszcoding?apiSecret=i34nvn324gdfg5',
    fetcher
  );

  console.log(data, error);

  return <CoursesContainer>Courses</CoursesContainer>;
};

export default Courses;

const CoursesContainer = styled.div`
  padding: 1rem;

  @media (min-width: 992px) {
    padding: 3rem 20rem;
  }
`;

type DataTypes = {
  data: IData;
  error: string;
};

interface IData {
  project: string;
  course: string;
  person: string;
  email: string;
  department: string;
  location: string;
  courseStartedDate: string;
  openedLessonsCount: string;
  completedDate: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  haveNotStarted: string;
  notOnSchedule: string;
  haveStarted: string;
  quizScore: number;
  quizScoreTotal: number;
  certificateTitle: string | null;
}
