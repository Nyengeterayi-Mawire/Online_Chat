import { useEffect,useContext } from "react";
import Chat from "../components/chat";
import Messages from "../components/messages";
import Sidebar from "../components/sideBar";
import axios from "axios";
import socketContext from "../context/context";
// import {io} from 'socket.io-client';
// const socket = io('http://localhost:3001',{autoConnect:true});


const Main = ()=>{
    const {changeOnlineUsers,socket,addOnlineUser,addMessage,contacts,addContact} = useContext(socketContext);

    useEffect(()=>{
        axios.get('http://localhost:3001/').then(res=>{
            console.log(res.data);
            changeOnlineUsers(res.data)
        });    
    },[]);
    
    useEffect(()=>{
        if(socket){
            socket.on('newLogin',(data)=>{
                // console.log('running this');
                addOnlineUser(data)});

            socket.on('receiveMessage',({message,sender})=>{
                // console.log('received');
                if(contacts.filter(contact=>contact.data._id === sender._id).length === 0){
                    addContact({data:sender});
                }
                addMessage(message);
                
              })
        } 
    },[socket])
   

    return(
        <div className="main">  
            <Sidebar/>
            <Chat />
            <Messages/>
        </div>
    )
}
export default Main; 