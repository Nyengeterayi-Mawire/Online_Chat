import  {useState,useContext} from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import Socketcontext from '../context/context';
import { io } from 'socket.io-client';
const Login = ()=> {   
    const [loginData,setLoginData] = useState({username:'',password:''})
    const [error,setError] = useState(' ');
    const {socketSet,changeUserLoggedIn,socket,changeToken} = useContext(Socketcontext);
    const navigate = useNavigate();

    const handleLogin = (e)=>{
        setLoginData(state=>state={...state,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(loginData.username.trim() === '' || loginData.password.trim() === ''){
            setError('All fields must be filled')
        }else{
            axios.post('http://localhost:3001/users/login',loginData).then(res=>{                
                if(res.data.error){
                    console.log(res.data.error)
                }else{                    
                    socketSet(io('http://localhost:3001/',{query:{userID : res.data.user._id,username : res.data.user.username}}));
                    changeUserLoggedIn(res.data.user);  
                    changeToken(res.data.token);                  
                    navigate('/chat');
                }
            }).catch(error=>{
                console.error(error);
                if(error.response.data.error){
                    setError(error.response.data.error)
                }
            })
        }
    }
    return (
        <div className="login">            
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Login </p>
                <p className="subtitle">Login and connect with friends and family </p>
                    <div className='field'>
                        <label>Username</label>
                        <input name='username' placeholder='smith_99' onChange={handleLogin}/>
                    </div>
                    <div className='field'>
                        <label>Password</label>
                        <input type='password' name='password' onChange={handleLogin}/>
                    </div> 
                    <p style={{color:'red',textAlign:'center',height:'fit-content',paddingTop:'10px',margin:'0px'}}>{error}</p>
                    <div style={{margin:'auto',width:'fit-content',paddingTop:'10px'}}>
                        <button className="submit" type='submit'>Submit</button>
                    </div>
                
                <p className="signin">Don't have an acount ? <Link to='/register'>Register</Link> </p>
            </form>

        </div>
    )
}
export default Login;