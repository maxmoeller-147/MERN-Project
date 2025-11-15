import api from "../api" 
import { useState, useEffect } from "react";
import { FriendList } from "../components/FriendsList";

export function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [ currentUserId, setCurrentUserId] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      const meRes = await api.get('/users/me');
      setCurrentUserId(meRes.data._id);

      const res = await api.get("/connection");
      setFriends(res.data);
      }
      fetchData();
    }, []);

    return (
    <main>
      <h1>Your Friends</h1>

      <FriendList friends={friends} currentUserId={currentUserId}/>

    </main>
  );
}


