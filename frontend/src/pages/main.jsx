import { useEffect,useContext, useState } from "react";
import Chat from "../components/chat";
import Messages from "../components/messages";
import Sidebar from "../components/sideBar";
import axios from "axios";
import socketContext from "../context/context";
import Messagenotification from "../components/messageNotification";
// import {io} from 'socket.io-client';
// const socket = io('http://localhost:3001',{autoConnect:true});


const Main = ()=>{
    const {changeOnlineUsers,socket,addOnlineUser,addMessage,contacts,addContact,messageContact} = useContext(socketContext);
    const [messageNotification,setMessageNotification] = useState({message:{messageText:''},sender:{avatar:'',username:''}});
    const [displayNotification,setNotification] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:3001/').then(res=>{            
            changeOnlineUsers(res.data)
        });    
    },[]);
    
    useEffect(()=>{
        if(socket){
            socket.on('newLogin',(data)=>{   
                // console.log('new login')             
                addOnlineUser(data)});

            socket.on('receiveMessage',({message,sender})=>{               
                // console.log('contacts',contacts) 
                if(contacts.filter(contact=>contact.data._id === sender._id).length === 0){
                    console.log('running')
                    addContact({data:sender});
                }     
                
                if(Object.keys(messageContact).length !== 0 && messageContact._id === sender._id){
                    // console.log(messageContact,sender._id);
                    addMessage(message);
                }else{
                    // console.log('sending notification')
                    setMessageNotification({message,sender});
                    setNotification(true);
                }               
                
                
              })
        } 
    },[socket,contacts,messageContact])
   
    // console.log('contacts',contacts)
    return(
        <div className="main">  
            <Sidebar/>
            <Chat />
            <Messages/>
            <Messagenotification messageNotification={messageNotification} displayNotification={displayNotification} functionDisplay={setNotification}/>
            {/* <button onClick={()=>setNotification(!displayNotification)}>Click</button> */}
        </div>
    )
}
export default Main; 