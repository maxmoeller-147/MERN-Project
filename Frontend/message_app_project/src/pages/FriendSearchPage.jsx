import { useEffect } from "react"
import api from "../api"

export default function FriendSearchPage() {

  // fetch all user from database 
  useEffect(() => {
    api.get("/users").then((response) => {
      allUsers = response.data.allUsers;
    })
  },[])

  return (
    <main>
      <h1>Connect with new Friends</h1>
      <input type="text" />
      <section>
        {users.map(user => (
          <FriendUser key={ friend._id } friend={ friend } currentUserId={currentUserId}/>
          ))}
      </section>
    </main>
  )
}