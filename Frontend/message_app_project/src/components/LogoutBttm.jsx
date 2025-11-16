import { useNavigate } from "react-router";
import api from "../api";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/users/logout",{}).then((response) => {
      if (response.data.message === "Logout successfully") {
        alert("logged out succesfully")
        navigate("/");
      }
    });
    // localStorage.removeItem('jwt');
    

    }

  return (
    <button onClick={handleLogout}>
        Log Out
    </button>
  );
  
}