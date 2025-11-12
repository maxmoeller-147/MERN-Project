import { useNavigate } from "react-router"

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/profiles/:userId/edit")
  }
  return (
    <main>
      <h1>user profile page</h1>
      <div>
        <button onClick={handleRedirect}>Edit</button>
        <img src="" />
        <p>Username</p> {/* to grab from Jwt in Cookie */}
      </div>
      <section>
        <p></p>
      </section>
    </main>
  )
}