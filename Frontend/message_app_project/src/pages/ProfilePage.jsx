import { useNavigate } from "react-router"

export function ProfilePage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate()
  }
  return (
    <main>
      <h1>user profile page</h1>
      <div>
        <button onClick={}>Edit</button>
        <img src="" />
        <p>Username</p>
      </div>
      <section>
        <p></p>
      </section>
    </main>

  )
}