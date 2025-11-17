import React, { useEffect, useState  } from "react";

export default function ChatForm( { socket, roomChatId} ) {

    const [message, setMessage] = useState("");

    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!socket || !socket.connected) {
        console.warn("Socket not connected.");
        return;
        }

        if (message.trim().length === 0) return;

        socket.emit("roomMessage", {
            roomId: roomChatId,
            msg: message,
        });

        setMessage("");
    }

    useEffect(() => { 
        const handleRoomMessage = (msg) => {
            console.log(msg);
        };

        socket.on("roomMessage", handleRoomMessage); 
        
        //Unmount the socket listen here
        return () => { 
            socket.off("roomMessage",handleRoomMessage); 
        };
    }, [socket]); //retrigger whenever socket changes (to remount the listeners)

  return (
    <div>
        <form id="form">
            <input value={message} type="text" id="message" name="message" autoComplete="off" onChange={onChangeMessage}/>
            <button onClick={onSubmit}>Send</button>
        </form>
    </div>
  );
}

