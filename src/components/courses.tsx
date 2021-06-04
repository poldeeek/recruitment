import styled, { keyframes } from 'styled-components';
import useSWR from 'swr';

import fetcher from '../utils/fetcher';
import { ICourse } from '../types';

import CollapsibleTable from './CollapsibleTable';

const Courses: React.FC = () => {
  const { data, error } = useSWR(
    'https://xtramile.azure-api.net/stats/lukaszcoding?apiSecret=i34nvn324gdfg5',
    fetcher
  );

  if (error) {
    return (
      <CoursesContainer>
        <Error>Something went wrong.</Error>
      </CoursesContainer>
    );
  }

  if (!data) return <Loader />;

  return (
    <CoursesContainer>
      <CollapsibleTable courses={data} />
    </CoursesContainer>
  );
};

export default Courses;

const CoursesContainer = styled.div`
  padding: 1rem;
  max-width: 100%;

  @media (min-width: 992px) {
    padding: 3rem 25rem;
  }
`;

const Error = styled.h1`
  color: red;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  margin: 5rem auto;
  border: 1.2rem solid #f3f3f3;
  border-top: 1.2rem solid orange;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  animation: ${spin} 2s linear infinite;
`;
