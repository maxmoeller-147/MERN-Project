import { useState } from "react";
import { FriendOptionsMenu } from "./FriendsOptionsMenu";

export function FriendUser({ friend }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <span>
        {friend.username}
        {friend.connectionStatus.toUpperCase()}
      </span>
      <button onClick={() => setOpen(!open)}>
        Options
      </button>

      {open && (
        <FriendOptionsMenu
          friend={friend}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};
