import { FriendOptionsMenu } from "./FriendsOptionsMenu";
import { useState } from "react";

export function FriendUser({ friend, currentUserId }) {
  const [open, setOpen] = useState(false);
  
  const friendData =
   friend.userId._id === currentUserId ? friend.friendId: friend.userId;
  
  return (
    <div>
      <span>
        {friendData.username}
        {friend.connectionStatus === "pending" && "(PENDING)"}
      </span>
      
        <button onClick={() => setOpen(!open)}>
        Options
      </button>

      {open && (
        <FriendOptionsMenu
          friend={friend}
          friendData={friendData}
          onClose={() => setOpen(false)}
        />
      )}
</div>

  );
};
