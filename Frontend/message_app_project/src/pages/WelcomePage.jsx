import { redirect, useNavigate } from "react-router";

export function WelcomePage() {
    const navigate = useNavigate();


    const handleRedirect = (path) => {
        navigate(path);     
    };


  return (
    <main>
        <h1>Welcome to Messaging 
            app!
        </h1>
       
       <img src="/src/assets/Logo.App.png" alt="Logo by IA" />

       <div>
        <p>Already have an account?</p>
        <button onClick={() => handleRedirect("users/login")}>Sign In</button>
        </div>  
               
       <div>
        <p>New to the app? Create an Account!</p>
        <button onClick={() => handleRedirect("users/register")}>Register</button>
        </div>  
    </main>
  )
}