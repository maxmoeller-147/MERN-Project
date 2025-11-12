import { Link } from "react-router";

export function NavBar() {
  return <nav>
    <Link to = {"/"}>
      <img class = "home-page" src=""></img>
    </Link>
    <Link>
      <img class = "friend-page" src=""></img>
    </Link>
    <Link>
      <img class = "profile-page" src=""></img>
    </Link>

  </nav>
}