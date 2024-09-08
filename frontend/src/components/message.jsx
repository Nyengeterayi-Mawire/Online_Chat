const Message = ({message,index}) => {    
    return( 
        <div >
             <div className="message" key={index}>
                {/* {message.avatar?<img className="contactAvatar" src={message.avatar}/>:<div className="contactAvatar"></div>} */}
                <p className="messageText">{message.messageText}</p>
                <p className="messageTime">{message.createdAt.split('T')[1].slice(0,5)} </p>
            </div>
        </div>
       
    )
}
export default Message;