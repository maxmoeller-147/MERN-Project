import { FriendUser } from "./FriendUser"

export function FriendList({ friends, currentUserId }) {
   
  if (friends.length === 0) return <p>you have no friends yet.</p>;

  return (
    <section>
      {friends.map(friend => (
        <FriendUser key={ friend._id } friend={ friend } currentUserId={currentUserId}/>
        ))}
    </section>
  );

}