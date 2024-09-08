import { useEffect,useContext} from 'react';
import './App.css';
import Login from './pages/login';
import Main from './pages/main';
import {Routes,Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import socketContext from './context/context';
import Register from './pages/register';
// import { Socketprovider } from './context/context';



function App() {
  const navigate = useNavigate();
  const {userLoggedIn} = useContext(socketContext);
  

  useEffect(()=>{
    navigate('/login');
  },[]) 

  

  return (
    <div className='App'>
      {/* <Socketprovider> */}
        <Routes>           
          <Route path='/login' element={Object.keys(userLoggedIn).length === 0?<Login/>:<Main/>}/>
          <Route path='/register' element={Object.keys(userLoggedIn).length === 0?<Register/>:<Main/>}/>
          <Route path='/chat' element={Object.keys(userLoggedIn).length !== 0?<Main />:<Login/>}/>              
        </Routes>  
      {/* </Socketprovider>       */}
    </div>
  )
}

export default App
