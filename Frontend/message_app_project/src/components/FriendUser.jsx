import { useState } from "react";
import { FriendOptionsMenu } from "./FriendsOptionsMenu";

export function FriendUser({ friend }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <section id="friend-item">
      
      <div>
        {friend.username}
      </div>
      <div>
        Status: {friend.connectionStatus.toUpperCase()}
      </div>

      </section>

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
