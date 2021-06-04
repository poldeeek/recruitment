import styled from 'styled-components';
import useSWR from 'swr';

import fetcher from '../helpers/fetcher';

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

  return <CoursesContainer>Courses</CoursesContainer>;
};

export default Courses;

const CoursesContainer = styled.div`
  padding: 1rem;

  @media (min-width: 992px) {
    padding: 3rem 20rem;
  }
`;

const Error = styled.h1`
  color: red;
`;
