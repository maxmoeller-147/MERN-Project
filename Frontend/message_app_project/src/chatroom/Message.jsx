export default function Message({ message , user}) {
    return(
        <div>
            <p>{user.username} says: {message.content}</p>
        </div>
    )
}