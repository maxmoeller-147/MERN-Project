import { useNavigate } from "react-router";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('jwt');
    
    alert("logged out succesfully")
    
    navigate("/");
    }

  return (
    <button onClick={handleLogout}>
        Log Out
    </button>
  );
  
}