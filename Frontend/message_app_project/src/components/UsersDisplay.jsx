import { useState } from "react"
import api from "../api"

export function UserDisplay(username, userId) {

  // const [connection,setConnection] = useState({
  //   friendId: "",
  //   connectionStatus: "PENDING"
  // });
  
  const createConnection = async () => {
    await api.post("/connection", {
      friendId: userId,
      connectionStatus: "PENDING"
    }).then((response) => {
      if (!response.data.error) {
        alert("Request sent!");
      }
    })
  };

  return(
    <div>
      <span>
        <p>{username}</p>
      </span>
    <button onClick={createConnection}>Connect</button>
    </div>

  )
}