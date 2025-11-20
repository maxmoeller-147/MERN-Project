export default function Message({ message }) {
    
       
    return(
        <div>
            {
            message?.profilePic !== "" && <img src={message.profilePic} />
            }
            <p>{message.username}: {message.content}</p>
        </div>
    )
}