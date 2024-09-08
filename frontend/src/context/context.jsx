import { useState } from "react";
import { createContext } from "react";
  

const socketContext = createContext(); 

export const Socketprovider = ({children}) => {
    const [socket,setSocket] = useState(''); 
    const [userLoggedIn,setUserLoggedIn] = useState({}); 
    const [token,setToken] = useState('');
    const [messageContact,setMessageContact] = useState({});
    const [onlineUsers,setOnlineUsers] = useState([]);
    const [messages,setMessages] = useState([]);
    const [contacts,setContacts] = useState([]);
    const [searchContacts,setSearchContacts] = useState([])

    const socketSet =(socketData)=> {
        setSocket(socketData)
    } 

    const changeUserLoggedIn = (user) => {
        setUserLoggedIn(user);
    }

    const changeToken = (token) => {
        setToken(token);
    }

    const searchContactsSet = (contacts) => {
        setSearchContacts(contacts);
    }
    const contactsSet = (contacts) =>{
        setContacts(contacts);
        
    }
    const addContact = (contact) =>{
        setContacts([contact,...contacts]);
        setSearchContacts([contact,...contacts]);
    }
    const changeMessageContact = (user) => {
        setMessageContact(user);
    } 
    const changeOnlineUsers = (users) => {
        setOnlineUsers(users);
    }

    const addOnlineUser = (user) => {
        setOnlineUsers(state=>[...state,user]);
    }
    const removeOnlineUser = (userID) => {
        setOnlineUsers(onlineUsers.filter(onlineUser=>onlineUser.userID !== userID ))
    }

    const addMessage = (message) => {        
        setMessages(state=>[...state,message])        
    }

    const messagesSet = (messages) => {
        setMessages(messages)
    } 

    
    
    return(
        <socketContext.Provider value={{socket,socketSet,userLoggedIn,changeUserLoggedIn,messageContact,changeMessageContact,onlineUsers,changeOnlineUsers,addOnlineUser,removeOnlineUser,messages,addMessage,messagesSet,contactsSet,addContact,contacts,searchContacts,searchContactsSet,changeToken,token}}>
            {children}
        </socketContext.Provider>
    )
}

export default socketContext;



