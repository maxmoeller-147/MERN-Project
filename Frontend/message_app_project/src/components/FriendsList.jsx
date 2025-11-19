import { useContext, useState } from 'react';
import { FriendUser } from "./FriendUser"
import { FriendDataContext } from "../Contexts/FriendDataContext";

export function FriendList() {
  const { friends } = useContext(FriendDataContext);
  const [open, setOpen] = useState(false);

  console.log(friends);
   
  if (friends.length === 0) return <p>Sorry, your friends list looks empty</p>;

  return (
    <section className='friends-list'>
      {
        friends.map(friend => (
          <FriendUser friend={friend} />
        ))
      }
    </section>
  );

}