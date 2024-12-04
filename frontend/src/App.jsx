import  {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginPage';
import RegisterForm from './components/Register';
import Home from './pages/Home';

function App() {
  function Logout(){
    localStorage.clear();
    return <Navigate to='/login'/>
  }
  function RegisterAndLogout() {
    localStorage.clear()
    return <RegisterForm />
  }
  

  return (
    <BrowserRouter>
       <Routes>
           <Route path='/login' element={<LoginForm/>}/>
           <Route path='/register' element={<RegisterAndLogout/>}/>
           <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
           <Route path='/logout' element={<Logout/>}/>


       </Routes>
    
    
    
    </BrowserRouter>
    
      
  );
}

export default App
