import axios from "axios"
import { useState,useContext } from "react";
import { IoClose } from "react-icons/io5";
import Contact from "./contact";
import socketContext from "../context/context";
const Newcontact = ({display,changeDisplay})=> {
    const [contacts,setContacts] = useState([]);
    // const [display,setDisplay] = useState(false);
    const {changeMessageContact,token} = useContext(socketContext);

    const handleSearch=(e)=>{
        axios.post('http://localhost:3001/users/search',{searchValue:e.target.value},{headers:{Authorization:token}}).then(res=>setContacts(res.data));
    }

    const handleClickContact = (contact) => {
        changeMessageContact(contact)
    }

    return (
        <div className="chat">
            <header>
                <h2>Find Contact</h2>
                <button onClick={()=>changeDisplay(false)}><IoClose size={'1.5em'} style={{margin:'auto'}}/>
                </button>
            </header> 
            <div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <input className="searchContact" onChange={handleSearch}/> 
                </div>
                
                <div className="contactsList">
                    {contacts && contacts.map((contact,index)=>{
                        return <button key={index} onClick={()=>handleClickContact(contact)}>
                            <Contact contact={contact}/>
                        </button>
                    })}

                </div>
            </div>
        </div>
    )
}
export default Newcontact;