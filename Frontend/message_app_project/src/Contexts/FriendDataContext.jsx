import { createContext, useEffect, useState } from "react";
import api from "../api";


export const FriendDataContext = createContext();
// export const CurrentUserContext = createContext();

export function FriendDataProvider({children}) {
  const [friends, setFriends] = useState([])
  // const [currentUserId, setCurrentUserId] = useState(null)
  

  useEffect(() => {
    async function fetchData() {
      try {
        const meResponse = await api.get('/users/me');
        const meId = meResponse.data._id;
        // setCurrentUserId(meId)

        const response = await api.get("/connection");
        // console.log(response)
        let friendData = [];
        if (response.data.length === 0) {
          friendData = []
        } else {
          response.data.map((connection) => {
          let realFriend = (connection.userId._id === meId) ? connection.friendId : connection.userId;
          friendData.push(realFriend);
        })
        }


        setFriends(friendData);
      } catch(error) {
        console.log(error)
      }
    }
      fetchData();
    }, []);
  

  
  // return <CurrentUserContext.Provider value={[currentUserId,setCurrentUserId]}>
  return   <FriendDataContext.Provider value={[friends,setFriends]}>
    {children}
  </FriendDataContext.Provider>
  // </CurrentUserContext.Provider>


  
}