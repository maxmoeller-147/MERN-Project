import { useLocation, NavLink } from "react-router-dom";




export function NavBar() {
  const loc = useLocation();

  const hideOnRoutes = [ "/", "/users/login", "/users/register"]; 
  if (hideOnRoutes.includes(loc.pathname)) {return null};

  return (
    <nav className="navbar">
      <NavLink to="/home">Home</NavLink>
      {/* need to find out who is current user */}
      <NavLink to="/profiles">Profile</NavLink> 
      <NavLink to="/friends/search">Search</NavLink>
      <NavLink to="/friends" end>Friends</NavLink>
    </nav>
  );
}
