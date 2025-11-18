import api from "../api" 
import { useState, useEffect, useContext } from "react";
import { FriendList } from "../components/FriendsList";
// import { CurrentUserProvider } from "../Contexts/CurrentUserProvider";
import { FriendDataContext } from "../Contexts/FriendDataContext";
// import { CurrentUserContext } from "../Contexts/CurrentUserContext";

export function FriendsPage() {
  // [friends, setFriends] = useContext(FriendDataContext)
  const [friends, setFriends] = useState([]);
  // const [currentUserId, setCurrentUserId] = useContext(CurrentUserContext);
  const [currentUserId, setCurrentUserId] = useState();
  

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


