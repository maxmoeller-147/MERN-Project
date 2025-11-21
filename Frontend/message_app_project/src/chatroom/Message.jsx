import "../styles/Message.css";


export default function Message({ message }) {
    
       
    return(
        <div className="message-box">
            <div className="small-circle">
                {
                message?.profilePic !== "" && <img src={`http://localhost:3000/uploads/${message.profilePic}`} />
                }
            </div>
            <p>{message.username}: {message.content}</p>
        </div>
    )
}