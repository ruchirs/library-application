import './App.css';
import { AuthContainer } from './components/auth/index'
import styled from 'styled-components'
import Background from './images/background.jpeg'

function App() {
  return (
    <AppContainer>
      <AuthContainer data-test="auth-component"/>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${Background});
`;

export default App;
