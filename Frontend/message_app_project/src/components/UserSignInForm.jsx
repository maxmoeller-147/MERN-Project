import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function UserSignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    // let headers = new Headers();
    // // set up authorisation bearer token
    // headers.set(
    //   "Authorization",
    //   "Basic " + btoa(email + ":" + password)
    // );

    let headers = {
      "Authorization": "Basic " + btoa(email + ":" + password)
    };
    // send to api for authentication verify, then give response, if status 200, display sucessfull message
    const response = await axios.post("http://localhost:3000/users/login",{
      email: email,
      password: password
    }, {
      headers: headers,
    })
    .then((response) => {
      if (response.data.error) {
        alert("Incorrect email or password, please try again!");
      } else {
        alert("Log in successfully!");
        navigate("/home"); // navigate to home page
      }
    })
    .catch((error) => console.log(error));
  
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