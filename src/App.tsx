import './style.css';

import img from './image.PNG';

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello!</h1>
      <img src={img} width="300px" height="300px" alt="sth" />
    </div>
  );
};

export default App;
