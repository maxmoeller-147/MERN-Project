import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";



export function FriendOptionsMenu ({ friend, friendData }) {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("")

  const handleUnfriend = async () => {
    if (!confirm("Do you want to delete this user from your friends list?"))
      return;
    

    try {
      await api.delete(`/connection/${friend._id}`);
      alert("Friend Deleted");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("An error has ocurred")
    }
};

  const createRoom = async () => {
    try {
      // const newObjectId = new mongoose.Types.ObjectId;
      await api.post("rooms",{
        name: "New Room Chat",
        participants: [friendData._id],
        type: "DIRECT"
      }).then((response) => {
        setRoomId(response.data._id);
        ;
      })
      navigate(`/rooms/${roomId}`)

    } catch(err) {
      console.error(err);
      alert("An error has ocurred");
    }
  }

return (
  <div className="DropMenu">
    
    <button onClick={() => navigate(`/profiles/${friendData._id}`) }>
        View Profile
    </button>

    <button onClick={() => { createRoom }}>
        Send Message
    </button>

    <button onClick={() => navigate(`/friends/create-group?user=${friendData._id}`) }>
        Create Group
    </button>

    <button onClick={handleUnfriend}>
        Delete Friend
    </button>

  </div>
);
}








