import { useState,useContext,useEffect } from "react";
import Contact from "./contact";
import socketContext from "../context/context";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import Newcontact from "./newContact";

const Chat = () => {    
    const {userLoggedIn,changeMessageContact,contacts,contactsSet,searchContacts,searchContactsSet,token} = useContext(socketContext);
    const [display,setDisplay] = useState(false);
    
    /*use effect to fetch all contacts in the users.contacts list*/
    useEffect(()=>{
        if (Object.keys(userLoggedIn).length !== 0){            
            Promise.all(userLoggedIn.contacts.map((contactID)=>{
                return axios.get('http://localhost:3001/users/'+contactID,{headers:{Authorization:token}})
            })).then(res=>{
                contactsSet(res);
                searchContactsSet(res);
            })
        }
    },[userLoggedIn]) 

    const handleClickContact = (contact) => {
        changeMessageContact(contact)
    }
    
    const handleSearch = (e) => {
        if(e.target.value.trim()){
            contactsSet(contacts=> contacts=contacts.filter(contact=>contact.data.username.includes(e.target.value)))
        }else{
            contactsSet(searchContacts);
        }    
        }
        
    return(
        !display? <div className="chat">            
            <header>
                <h2>Chats</h2> 
                <button onClick={()=>setDisplay(true)}><FaPlus size={'1.5em'} style={{margin:'auto'}} /></button>
            </header> 
            <div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <input className="searchContact" placeholder='search users' onChange={handleSearch}/> 
                </div>                
                <div className="contactsList">
                    {contacts && contacts.map((contact,index)=>{
                        return <button key={index} onClick={()=>handleClickContact(contact.data)}>
                            <Contact contact={contact.data}/>
                        </button>
                    })}

                </div>
            </div>    

        </div>: <Newcontact display={display} changeDisplay={setDisplay}/>
    )
}
export default Chat;