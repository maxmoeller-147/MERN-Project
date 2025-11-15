import { useNavigate } from "react-router-dom";


export function FriendUser({ friend, currentUserId }) {
  const navigate = useNavigate();
  
  const friendData = friend.userId._Id === currentUserId ? friend.friendId: friend.userId;
  
  const openOptions = () => {
    navigate(`/friends/${friendData._id}/options`);
    };

  


  
  return (
    <div>
      <span>
        {friendData.username}
        {friend.connectionStatus === "pending" && "(PENDING)"}
      </span>
      
      <button onClick= { openOptions}>Options</button>
    </div>
  );
};
