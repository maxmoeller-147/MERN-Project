import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";



export function FriendOptionsMenu ({ friend }) {
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

      // check if room for these user has been created

      // if already exist, view existed room

      // if not, create new room
      await api.post("rooms",{
        name: "New Room Chat",
        participants: [friend._id],
        type: "DIRECT"
      }).then((response) => {
        setRoomId(response.data._id);
        navigate(`/rooms/${response.data._id}`);
      })
      

    } catch(err) {
      console.error(err);
      alert("An error has ocurred");
    }
  }

return (
  <div className="drop-options">
    
    <button onClick={() => navigate(`/profiles/${friend._id}`) }>
        View Profile
    </button>

    <button onClick={ createRoom }>
        Send Message
    </button>

    {/* <button onClick={() => navigate(`/friends/create-group?user=${friendData._id}`) }>
        Create Group
    </button> */}

    <button onClick={handleUnfriend}>
        Delete Friend
    </button>

  </div>
);
}








