/* 
Page just created for be able to connect with welcome page. 
I already did the routes for this page. 
Jack's Task to develop the code. 
*/

export default function Register() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      // send to api for authentication verify, then give response, if status 200, display sucessfull message
      const response = await api.post("http://localhost:3000/users/login",{}, {
        headers: {
          Authorization: "Basic " + btoa(email + ":" + password),
        },
      });

      if (response.data.error){
        setError("Incorrect email or password, please try again!")
      } else{
        navigate("/home");
      }
    } catch (error){
      setError("An unknown error occured, please try again!")
      console.log(error);
    }
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={onChangeEmail}/>
        </div>
        
        <div>
           <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" onChange={onChangePassword} />
        </div>

        <button onClick={onSubmit}>Sign in</button>
      </form>
    </div>
  )
}