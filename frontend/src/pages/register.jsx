import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const Register = ()=> {   
    const [loginData,setLoginData] = useState({firstname:'',lastname:'',username:'',email:'',password:'',avatar:''})
    const [error,setError] = useState(' ');
    const navigate = useNavigate();

    const handleInput = (e)=>{
        setLoginData(state=>state={...state,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(loginData.username.trim() === '' || loginData.password.trim() === '' || loginData.firstname.trim() == '' || loginData.lastname.trim() === '' || loginData.email.trim() === ''){
            setError('All fields must be filled')
        }else{
            axios.post('http://localhost:3001/users/register',loginData).then(res=>{                
                if(res.data.error){
                    console.log(res.data.error)
                }else{                               
                    navigate('/login');
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
        <div className="register">            
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register </p>
                <p className="subtitle">Signup now and get full access to our app. </p>
                    <div className='field'>
                        <label>Firstname</label>
                        <input name='firstname' placeholder='John' onChange={handleInput}/>
                    </div>
                    <div className='field'>
                        <label>Lastname</label>
                        <input name='lastname' placeholder='Doe' onChange={handleInput}/>
                    </div>
                    <div className='field'>
                        <label>Username</label>
                        <input name='username' placeholder='JohnDoe00' onChange={handleInput}/>
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type="email" placeholder='johndoe@gmail.com' name='email' onChange={handleInput}/>
                    </div>
                    <div className='field'>
                        <label >Password</label>
                        <input type="password" name='password' onChange={handleInput}/>
                    </div> 
                    <p style={{color:'red',textAlign:'center',height:'fit-content',paddingTop:'10px',margin:'0px'}}>{error}</p>
                    <div style={{margin:'auto',width:'fit-content',paddingTop:'10px'}}>
                        <button className="submit" type="submit">Submit</button>
                    </div>
                
                <p className="signin">Already have an acount ? <Link to='/login'>Login</Link> </p>
            </form>
        </div>
    )
}
export default Register;