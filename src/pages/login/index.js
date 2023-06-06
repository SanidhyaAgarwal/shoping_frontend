import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const [data, setData] = useState([]);

//   const handleSubmit =() =>async () => {
//     const res = await fetch(`http://localhost:8081/api/user/oauth/`);
//     const result = res.json();
//     console.log(result)
//     return result;
// }
const loginPage = () => async{
  let item = {email,password}
  let result = await fetch(`http://localhost:8081/api/user/oauth`,{
    method : "POST",
    header : {
      "Content-type":"application/json",
      "Accept":"application-json"
    },
    body:JSON.stringify(item)
  });
  result = result.json
}
  
  return <div>
    <h2>Login</h2>
    <form onSubmit={loginPage}}>
      <label for="email">Email:</label>
      <br/>
      <input type="text" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <br/>
      <label for="password">Password:</label>
      <br/>
      <input type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <br/>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
<p>Create an account</p>
<Link to="/signup">Signup</Link>
  </div>;
}