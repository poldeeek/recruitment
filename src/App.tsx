import styled from 'styled-components';

import Courses from './components/courses';

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header>
        <Title>Courses</Title>
      </Header>
      <Courses />
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div``;

const Header = styled.header`
  height: 5rem;
  padding: 0 1rem;
  background-color: orange;
  display: flex;
  align-items: center;

  @media (min-width: 992px) {
    padding: 0 20rem;
  }
`;

const Title = styled.h1`
  margin: 0;
`;
