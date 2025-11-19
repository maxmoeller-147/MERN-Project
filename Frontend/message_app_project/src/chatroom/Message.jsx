export default function Message({ message }) {
    return(
        <div>
            <p>{message.username} says: {message.content}</p>
        </div>
    )
}