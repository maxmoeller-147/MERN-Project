import { useState } from "react";
import api from "../api";

export default function RoomChat() {
  const [roomName, setRoomName] = useState("");
  const [participants, setParticipants] = useState("");

  const onChangeName = (e) => {
    setRoomName(e.target.value);
  };

  const onChangeParticipants = (e) => {
    setParticipants(e.target.value)
  };

  
  const createRoom = async () => {
    api.post("/rooms", data).then((response) => {

    })
  };

  return (
    <div>
      <div>
        <div>
          <p>User: message</p>
          <p id="messages">message status</p>
        </div>
        <form id="form">
          <input id="input" autocomplete="off" /><button>Send</button>
        </form>
      </div>

      <script src="/socket.io/socket.io.js"></script>
      <script src="http://localhost:3000/js/chat.js"></script>
    </div>
  )
}