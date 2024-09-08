import { useState,useContext, useEffect } from "react";
import socketContext from "../context/context";
import axios from 'axios';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
const Settings = ({changeDisplayProfile,displayProfile}) => {
    const {userLoggedIn,changeUserLoggedIn,token}= useContext(socketContext);
    const [displayUsername,setDisplayUsername] = useState(false);
    const [displayEmail,setDisplayEmail] = useState(false);
    const [disablePassword,setDisablePassword] = useState(true); 
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    useEffect(()=>{
        setUsername(userLoggedIn.username);
        setEmail(userLoggedIn.email);
        
    },[userLoggedIn]); 

    const handleSave = () => {
        const form = new FormData;        
        if(username !== userLoggedIn.username){
            form.append('username',username)
        }
        if(email !== userLoggedIn.email){
            form.append('email',email)
        } 
        if(password.trim() !== '' && password === confirmPassword){
            form.append('password',password)
        }

        axios.patch('http://localhost:3001/users/'+userLoggedIn._id,form,{headers:{Authorization:token}}).then(res=>{
            if(res.data.error){
                console.log(res.data.error)
            }else{
                changeUserLoggedIn(res.data);
            }
        })
        
    }
    return (
        <div className={`settings ${displayProfile?'show':'hide'}`} >
            <div style={{position:'relative'}}>
                <div style={{display:'flex'}}>
                    {userLoggedIn.avatar?<img className="profilePic" src={`http://localhost:3001/${userLoggedIn.avatar}`}/>:<div className="profilePic" style={{backgroundColor:'grey'}}></div>}
                </div>
                <div className='info'>
                    <label>Username : </label> 
                    <div className="changeInfo">
                        {!displayUsername?<p className="infoInput">{username}</p>:<input name='username' className="infoInput" value={username} onChange={(e)=>setUsername(e.target.value)}/> }
                        <button onClick={()=>setDisplayUsername(!displayUsername)}><MdOutlineModeEditOutline size={'1.5em'} style={{margin:'auto'}}/></button> 
                    </div>
                </div>
                <div className='info'>
                    <label>Email : </label>
                    <div className="changeInfo">
                        {!displayEmail?<p className="infoInput">{email}</p>:<input name='email' className="infoInput" value={email} onChange={(e)=>setEmail(e.target.value)}/> }
                        <button onClick={()=>setDisplayEmail(!displayEmail)}><MdOutlineModeEditOutline size={'1.5em'} style={{margin:'auto'}}/></button> 
                    </div> 
                </div>  
                <div className='info'>
                    <label>Password : </label>
                    <div className="changeInfo">
                        <input className="infoInput" name='password' placeholder="enter password" disabled={disablePassword} onChange={(e)=>setPassword(e.target.value)}/>
                        <input name='password' className="infoInput" placeholder="confirm password" disabled={disablePassword} onChange={(e)=>setConfirmPassword(e.target.value)}/> 
                        <button onClick={()=>setDisablePassword(false)}><MdOutlineModeEditOutline size={'1.5em'} style={{margin:'auto'}}/></button> 
                    </div> 
                </div>  
                <div style={{display:'flex',paddingTop:'30px'}}>
                    <button className='save' onClick={handleSave}>Save</button>
                </div> 
                <button className="closeSettings" onClick={()=>changeDisplayProfile(false)}><IoClose  size={'1.5em'} style={{margin:'auto'}} /></button>            
                
            </div>
        </div>
    )
}
export default Settings;