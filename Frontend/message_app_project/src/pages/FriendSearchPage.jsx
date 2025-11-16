import { useEffect } from "react"
import api from "../api"
import { UserDisplay } from "../components/UsersDisplay";

export default function FriendSearchPage() {
  let allUsers;
  // fetch all user from database 
  useEffect(() => {
    api.get("/users").then((response) => {
      console.log(response.data)
      allUsers = response.data;
    })
  },[])

  return (
    <main>
      <h1>Connect with new Friends</h1>
      <input type="text" />
      <section>
        {allUsers.map((user) => 
          UserDisplay(user.username, user.userId)
          )}
      </section>
    </main>
  )
}