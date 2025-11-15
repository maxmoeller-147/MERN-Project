import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import api from "../api";

const createUrl = (...partsArray) => partsArray.filter(Boolean).join('/');

export default function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params?.userId || "";

  const [profile, setProfile] = useState({
    username: "",
    image: "",
    description: "",
  });

  const handleRedirect = () => {
    navigate("/profiles/edit")
  }

  useEffect(() => {
    api.get(createUrl('/profiles', userId)).then((response) => {
      if(response.data.error) {
        if (response.data.error === "Current user profile is not available!") {
            navigate("/profiles/edit")
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
  }, []);

            

  return (
    <main>
      <h1>User profile</h1>
      {/* make button only visible for user owning profile */}
        {
        !userId &&
        <button onClick = {handleRedirect}>Edit</button>
        }
      <div>
        {
          profile?.image && <img src={profile.image} />
        }
        <h1>Username: { profile?.username }</h1>
      </div>
      <section>
        <h2>Description</h2>
        <p>{ profile.description }</p>
      </section>
    </main>
  )
}