import { Link, useLocation } from "react-router-dom";

export function NavBar() {
  const loc = useLocation();

  const hideOnRoutes = [ "/", "/users/login", "/users/register"]; 
  if (hideOnRoutes.includes(loc.pathname)) {return null};

  return (
    <nav>
      <Link to="/home">Home</Link>
      {" | "}
      <Link to="/profiles/:userId">Profile</Link>
      {" | "}
      <Link to="/search">Search</Link>
      {" | "}
      <Link to="/friends">Friends</Link>
    </nav>
  );
}
