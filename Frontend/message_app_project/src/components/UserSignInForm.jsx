import { useState } from "react";

export default function UserSignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = async (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let headers = new Headers();
    // set up authorisation bearer token
    headers.set(
      "Authorization",
      "Basic" + btoa(username + ":" + password)
    );
    // send to api for authentication verify
    const response = await fetch("http://localhost:3000/users/signin", {
      headers: headers,
    });

    const data = await response.json();
    
    const jwtToken = data.jwt;
    // save jwt into cookie
    // give response, if status 200, move to next step
  
  }

  return (
    <form>
      <label></label>
      <input />
      <label></label>
      <input />
    </form>
  )
}