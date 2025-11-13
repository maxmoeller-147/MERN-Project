import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/profiles/:userId">Profile</Link>
      {" | "}
      <Link to="/search">Search</Link>
    </nav>
  );
}
