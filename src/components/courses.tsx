import styled from 'styled-components';

const Courses: React.FC = () => {
  return <CoursesContainer>Courses</CoursesContainer>;
};

export default Courses;

const CoursesContainer = styled.div`
  padding: 1rem;

  @media (min-width: 992px) {
    padding: 3rem 20rem;
  }
`;
