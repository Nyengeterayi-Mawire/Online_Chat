import { useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { TiMessages } from "react-icons/ti";
import socketContext from "../context/context";
import { useNavigate} from 'react-router-dom';
import Settings from "./settings";
import { io } from "socket.io-client";
const Sidebar = () => {
    const {userLoggedIn,changeUserLoggedIn,changeMessageContact,socket} = useContext(socketContext); 
    const [displayProfile,setDisplayProfile]= useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        changeUserLoggedIn({}); 
        changeMessageContact({});
        socket.disconnect();
        navigate('/login');
    }
    return(
        <div className="sideBar">
            <div style={{paddingTop:'20px'}}>
                <div className="sideBarButtonDiv" id='topButton'>
                    <button className="sideBarButton"><TiMessages size={'2em'} style={{margin:'auto'}}/></button>
                </div> 
            </div>
            
            <div style={{justifySelf:'baseline',marginTop:'auto',paddingBottom: '10px'}}>
                <div className="sideBarButtonDiv" id='bottomButton' style={{justifySelf:'baseline',marginTop:'auto'}}>
                    <button className="sideBarButton" onClick={handleLogout}><BiLogOut size={'2em'} style={{margin:'auto'}}/></button>
                </div>
                <div className="sideBarButtonDiv"  id='bottomButton' style={{justifySelf:'baseline',marginTop:'auto'}}>
                    {userLoggedIn.avatar?<img className='sideBarAvatar' onClick={()=>setDisplayProfile(true)} src={`http://localhost:3001/${userLoggedIn.avatar}`} />:<div className='sideBarAvatar' style={{backgroundColor:'grey'}} onClick={()=>setDisplayProfile(true)}></div>}
                    
                </div>
            </div> 
            
            <Settings changeDisplayProfile={setDisplayProfile} displayProfile={displayProfile}/>
           


        </div>
    )
}
export default Sidebar;