import { useState } from "react";
import UserRegisterForm from "../components/UserRegisterForm";


export default function Register() {

  const [error, setError] = useState("");

  return (
    <main>
      <h1>Register user</h1>

      {error && (
        <p style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      <UserRegisterForm setError={setError}/>
    </main>
  );
}