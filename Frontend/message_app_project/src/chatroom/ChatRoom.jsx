
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
        

export default function UserJoiningRoom({ roomChatId }) {
    useEffect(() => {
        //Check if there is a coockie
        const authCookie = request?.cookies?.authcookie ?? null;

        //if no auth cookie is provided, exit
        if (authCookie == null) {
            navigate("/users/login");
            return
        }

        // Connect to the server using Socket.IO, sending the JWT in auth
        const socket = io("http://localhost:3000", {
            auth: { token: authCookie }
        });

        //Try to connect and join the room
        socket.on("connect", () => {
            //Join the room we are currently in
            if (!roomChatId){
                navigate("/404");
                return;
            }
            socket.emit("joinRoom", roomChatId);
        });

        //Restore chat history after joining room
        socket.on('restoreChatHistory', (messageHistory) => {
        messageHistory.forEach(msg => {
            const li = document.createElement('li');
            li.textContent = msg.content;
            messages.appendChild(li);
        });
        });

        socket.on("forceDisconnect", (reason) => {
            //If we are disconnected, send the user back to the homepage (or an error page)
            //Can send the reason in the future as well
            alert(reason);
            navigate("/404");
        });
            
    })

}