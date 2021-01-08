import './App.css';
import { AuthContainer } from './components/auth/index'

function App() {
  return (
    <div className="App">
      <AuthContainer data-test="auth-component"/>
    </div>
  );
}

export default App;
