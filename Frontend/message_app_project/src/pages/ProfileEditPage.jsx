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
  // console.log(data?.image);
    await api.patch("/profiles/edit", {
      image: data?.image || "",
      description: data?.description || ""
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      if (!response?.data?.error) {
        alert("Profile saved!")
        navigate("/profiles")
      }
    });
};



const onChangeInput = (e) => {
  const fieldName = e?.target?.name;
  let fieldValue = e?.target?.value;

  if (fieldName === "image") {
    // const formData = new FormData();
    // const file = e.target.files[0];
    // if (file) {
    //   formData.append("image", )
    // }
    
    fieldValue = e.target.files[0];
  }
  setProfile((currentValue) => ({ ...currentValue, [fieldName]: fieldValue }));
};

const onSave = (e) => {
  e.preventDefault();

  //   if (file) {
  //   // const reader = new FileReader();
  //   // reader.onload = btoa(file.target.result);
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     const base64Image = 
  //   }
  //   const formData = new FormData();
  //   formData.append("image", file.value)

  // }

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
          <input type="file" id="avatar" name="image" accept="image/jpeg, image/png" onChange={onChangeInput}/>
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