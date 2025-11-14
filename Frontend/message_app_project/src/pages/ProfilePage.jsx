import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router"
import api from "../api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();

  const [profile, setProfile] = useState({
    username: "",
    image: "",
    description: "",
  });

  const handleRedirect = () => {
    navigate(`/profiles/${params.userId}/edit`)
  }

  useEffect(() => {
    if (params.userId) {
      api.get(`/profiles/${params.userId}`).then((response) => {
        if (response.data.error) {
          if (response.data.error === "User profile is not available!") {
            navigate(`/profiles/${params.userId}/edit`)
          } else {
            navigate("/404")
          }
        }

        setProfile({
          username: response.data?.username,
          userId: response.data?.userId,
          image: response.data?.image,
          description: response.data?.description,
        });
      })
      .catch((error) => console.log(error));
    }
  }, []);

  return (
    <main>
      <h1>User profile</h1>
        <button onClick = {handleRedirect}>Edit</button>
      <div>
        {
          profile?.image && <img src={profile.image} />
        }
        <h1>Username: { profile?.username }</h1> {/* to grab from Jwt in Cookie */}
      </div>
      <section>
        <h2>Description</h2>
        <p>{ profile.description }</p>
      </section>
    </main>
  )
}