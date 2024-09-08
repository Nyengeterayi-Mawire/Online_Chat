import { useState,useContext } from "react";
import socketContext from '../context/context';

const Contact = ({contact}) => {
    // const [contact,setContact] = useState([{avatar:'',name:'Nyenge'}])
    const {messages} = useContext(socketContext)
    return(
        <div className="contact">
            {contact.avatar !== '' ? <img className='avatar' src={`http://localhost:3001/${contact.avatar}`}/>:<div className="avatar"></div>}
            <div style={{display:'flex',justifyContent:'center'}}>
                <p className="contactName">{contact.username}</p>
                {/* <p >{messages[-1].messageText}</p> */}
            </div>
            
        </div>
    )
}
export default Contact;