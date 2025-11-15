import { useState } from "react";
import UserLogInForm from "../components/UserLogInForm";

export default function LogInPage() {

  const [error, setError] = useState("");


  return (
    <main>
      <h1>Sign in</h1>

      {error && (
        <p style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      <UserLogInForm setError={setError}/>
    </main>
  );
}