import { useEffect } from "react";

const Messagenotification = ({messageNotification,displayNotification,functionDisplay}) => {

    useEffect(()=>{
        setTimeout(()=>functionDisplay(false),3000)
    },[displayNotification])
    
    
    return (
        <div className={`messageNotification ${displayNotification ? 'show':'hide'}`}>
            <div className="notificationInnerDiv">
            {messageNotification.sender.avatar?<img className="notificationAvatar" src={`http://localhost:3001/${messageNotification.sender.avatar}`}/>:<div className="notificationAvatar"></div>}
                {/* <div className="notificationAvatar"></div> */}
                <div className="notificationInfoDiv">
                    {/* <p className="notificationUsername">Nyrngeterayi</p> 
                    <p className="notificationMessage">Hi how are you. I was wondering if you wanted to play basketball today</p> */}
                    <p className="notificationUsername">{messageNotification.sender.username}</p> 
                    <p className="notificationMessage">{messageNotification.message.messageText}</p>
                </div>
            </div>
        </div>
    )
}
export default Messagenotification;