
export default function ProfileEditPage() {
  return (
    <main>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email"/>
        </div>
        <div>
          <label htmlFor="avatar">Profile image:</label>
          <input type="file" id="avatar" name="avatar"/>
          {/* <input type="button" id="choose-button" name="choose-button" /> */}
        </div>
        <div>
          <label htmlFor="description">Bio description:</label>
          <input type="text" id="description" name="description" />
        </div>
      </form>
    </main>
  )
}