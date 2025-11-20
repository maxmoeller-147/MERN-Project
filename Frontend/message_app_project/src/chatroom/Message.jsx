export default function Message({ message }) {
    
       
    return(
        <div>
            {
            message?.profilePic !== "" && <img src={`http://localhost:3000/uploads/${message.profilePic}`} />
            }
            <p>{message.username}: {message.content}</p>
        </div>
    )
}