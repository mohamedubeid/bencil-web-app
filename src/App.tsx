import { Route, Routes } from 'react-router-dom'
import SignUpPage from "./pages/signupPage/SignUpPage";
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={ <HomePage /> } />
      <Route path='/signup' element={ <SignUpPage /> } />
      <Route path='/login' element={ <LoginPage /> } />
    </Routes>
  );
}

export default App;
