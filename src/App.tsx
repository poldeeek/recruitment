import styled from 'styled-components';

import Courses from './components/Courses';

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
  height: 8rem;
  padding: 0 1rem;
  background-color: orange;
  display: flex;
  align-items: center;

  @media (min-width: 992px) {
    padding: 0 25rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.8rem;
`;
