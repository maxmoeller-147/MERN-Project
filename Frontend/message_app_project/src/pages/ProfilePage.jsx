import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import api from "../api";


export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const userIdParams = params?.userId || ""; 

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    image: "",
    description: "",
  });

  const handleRedirectToProfileEdit = () => {
    navigate("/profiles/edit")
  }

  useEffect(() => {
    api.get(`profiles/${userIdParams}`).then((response) => {
      if (response.data.error) {
          navigate("/404");
        } else {
          setProfile({
            username: response.data?.username || "",
            email: response.data?.email || "",
            image: response.data?.image || "",
            description: response.data?.description || "",
          });
        }

    })
  }, []);

            

  return (
    <main>
      <h1>User profile</h1>
      {/* button only visible for user owning profile */}
        {
        !userIdParams &&
        <button onClick = {handleRedirectToProfileEdit}>Edit</button>
        }
      <div>
        {
          profile?.image && <img src={profile.image} />
        }
        <h1>Username: { profile?.username }</h1>
      </div>
      <section>
        <h2>Description</h2>
        <p>{ profile?.description }</p>
      </section>
    </main>
  )
}