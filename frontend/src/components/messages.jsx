import { useState,useContext,useEffect,useRef } from "react";
import socketContext from "../context/context";
import Message from "./message";
import Messagesend from "./messageSend";
import axios from "axios";
import { LuSendHorizonal } from "react-icons/lu";

const Messages = () => {    
    const [conversation,setConversation] = useState('');
    const [sendMessage,setSendMessage] = useState(''); 
    const messageLogRef = useRef(null);
    const {messageContact,userLoggedIn,onlineUsers,socket,messages,messagesSet,addMessage,contacts,addContact,token} = useContext(socketContext);

    /*useEffect to fetch conversation between user and conntact, and then fetch converstaion messages*/
    useEffect(()=>{
        if(Object.keys(messageContact).length !== 0){            
            axios.post('http://localhost:3001/conversations/single',{firstContact:userLoggedIn._id,secondContact:messageContact._id},{headers:{Authorization:token}}).then(res=>{
                if(Object.keys(res.data).length !== 0){
                    setConversation(res.data._id)
                    axios.get('http://localhost:3001/messages/'+res.data._id,{headers:{Authorization:token}}).then(res=>{                        
                        messagesSet(res.data);
                    })
                }
            }).catch(error=>{
                if(error.response.data.error){
                    setConversation('');
                    messagesSet([]);
                }
            })
        }
    },[messageContact]) 

    /*Useffect to scroll message log to bottom when new messsage received*/ 
    useEffect(()=>{
        if(messageLogRef.current){
            messageLogRef.current.scrollTop = messageLogRef.current.scrollHeight;
        }
    },[messages]);

    const handleSend =()=>{
        if(!sendMessage.trim()){
            return console.log('Enter text to send')
        }else{ 
            if(conversation !== ''){
                axios.post('http://localhost:3001/messages/',{conversationID:conversation,userID:userLoggedIn._id,messageText:sendMessage},{headers:{Authorization:token}}).then(res=>{
                    if(res.data.error){
                        return console.log(res.data.error)
                    }else{
                        if(onlineUsers.filter(user=>user.userID === messageContact._id).length !== 0){
                            socket.emit('sendMessage',{socketID:onlineUsers.filter(user=>user.userID === messageContact._id)[0].socketID,message:res.data,sender:userLoggedIn})
                        }
                        addMessage(res.data)
                        if(contacts.filter(contact=>contact.data._id === messageContact._id).length === 0){                            
                            addContact({data:messageContact});
                        }
                        setSendMessage('');
                    }
                })
            }else{
                axios.post('http://localhost:3001/conversations',{firstContact:userLoggedIn._id,secondContact:messageContact._id},{headers:{Authorization:token}}).then(res=>{
                    if(res.data.error){
                        return console.log(res.data.error)
                    }else{
                        setConversation(res.data._id);
                        axios.post('http://localhost:3001/messages/',{conversationID:res.data._id,userID:userLoggedIn._id,messageText:sendMessage},{headers:{Authorization:token}}).then(res=>{
                            if(res.data.error){
                                return console.log(res.data.error)
                            }else{
                                if(onlineUsers.filter(user=>user.userID === messageContact._id).length !== 0){
                                    socket.emit('sendMessage',{socketID:onlineUsers.filter(user=>user.userID === messageContact._id)[0].socketID,message:res.data,sender:userLoggedIn})
                                }
                                addMessage(res.data)
                                if(contacts.filter(contact=>contact.data._id === messageContact._id).length === 0){                            
                                    addContact({data:messageContact});
                                }
                                setSendMessage('');
                            }
                        })
                    }
                })
            }
            
        }
    }    
    
    return(
        
        <div className="messages">          
            {Object.keys(messageContact).length !== 0 ?             
            <>                
            <header>
                <div className="headerContact">
                    {messageContact.avatar !== ''?<img className="avatar" src={`http://localhost:3001/${messageContact.avatar}`}/>:<div className="avatar"></div>} 
                    <div className="usernameOnline">
                        <h3>{messageContact.username}</h3>
                        {onlineUsers.filter(user=>user.userID === messageContact._id).length !== 0?<p style={{color:'green'}} >Online</p>:<p style={{color:'red'}} >Offline</p>}
                    </div>
                </div>
                
                
                {/* <div style={onlineUsers.filter(user=>user.userID === messageContact._id).length !== 0?{backgroundColor:'green',width:'40px',height:'40px'}:{backgroundColor:'red',width:'40px',height:'40px'}}></div> */}
            </header>
            <div className="messageLog" ref={messageLogRef}>
                {messages && messages.map((message,index)=>{
                    return message.userID !== userLoggedIn._id ? <Message message={message} index={index}/> : <Messagesend message={message} index={index}/>
                })}
            </div> 
            <div className="messageInput">
                <textarea onChange={(e)=>setSendMessage(e.target.value)} value={sendMessage}/> 
                <button className='sideBarButton' onClick={handleSend}><LuSendHorizonal size={'2em'} /></button>
            </div>
            </> : <div style={{display:'flex',height:'100%',justifyContent:'center',alignItems:'center',fontSize:'16px'}}><p>Select a contact and start chatting</p></div>}

        </div>
    )
}
export default Messages;