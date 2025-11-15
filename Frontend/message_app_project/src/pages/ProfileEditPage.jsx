import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api";

export default function ProfileEditPage() {

  const navigate = useNavigate();

const [profile, setProfile] = useState({
  username: "",
  email: "",
  image: "",
  description: ""
})


const putData = async (data) => {
    await api.patch("/profiles/edit", {
      image: data?.image || "",
      description: data?.description || ""
    }).then((response) => {
      if (!response?.data?.error) {
        alert("Profile saved!")
        navigate("/profiles")
      }
    });
};

const onChangeInput = (e) => {
  setProfile((currentValue) => ({ ...currentValue, [e.target.name]: e.target.value}));
};

const onSave = (e) => {
  e.preventDefault();
  putData(profile);
};


// Check if profile already available
  useEffect(() => {
    api.get("/profiles").then((response) => {

      setProfile({
          username: response?.data?.username || "",
          description: response?.data?.description || "",
          image: response?.data?.image || "",
          email: response?.data?.email || "",
      });
  })
  }, []);


  return (
    <main>
        <h2>Create/ Edit Profile</h2>
      <form>
        <div>
          <p>Username: {profile.username}</p>
        </div>
        <div>
          <p>Email: {profile.email}</p>
        </div>
        <div>
          <label htmlFor="avatar">Profile image:</label>
          <input type="file" id="avatar" name="avatar" onChange={onChangeInput}/>
        </div>
        <div>
          <label htmlFor="description">Bio description:</label>
          <input type="text" id="description" name="description" value={profile?.description} onChange={onChangeInput} />
        </div>
        <button type="submit" onClick={onSave}>Save</button>
      </form>
    </main>
  )
}