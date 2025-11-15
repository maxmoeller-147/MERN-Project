import api from "../api";
import { useNavigate } from "react-router";



export function FriendOptionsMenu ({ friend, friendData }) {
  const navigate = useNavigate();

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

return (
  <div className="DropMenu">
    
    <button onClick={() => navigate(`/profile/${friendData._id}`) }>
        View Profile
    </button>

    <button onClick={() => navigate(`/chatroom/${friendData._id}`) }>
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








