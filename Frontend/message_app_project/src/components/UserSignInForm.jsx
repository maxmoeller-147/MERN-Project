import axios from "axios";
import { useState } from "react";

export default function UserSignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let headers = new Headers();
    // set up authorisation bearer token
    headers.set(
      "Authorization",
      "Basic" + btoa(email + ":" + password)
    );
    // send to api for authentication verify, ERROR OCCURRED, TO BE FIXED
    const response = await axios.post("http://localhost:3000/users/signin",{
      email: email,
      password: password
      }, {
      headers: headers,
    }).then((response) => console.log(response));

    // give response, if status 200, display sucessfull message, TO BE REVIEWED
    if (response.status === 200) {
      alert("Log in succesfully")
    } else {
      alert("Incorrect email or password, please try again!")
    }
  
  }

  return (
    <div>
      <h1>Sign in</h1>
      <form>
        <div onChange={onChangeEmail}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email"/>
        </div>
        
        <div onChange={onChangePassword}>
           <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" />
        </div>

        <button onClick={onSubmit}>Sign in</button>
      </form>
    </div>
  )
}