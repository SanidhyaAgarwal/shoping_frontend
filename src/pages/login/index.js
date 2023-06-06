import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import './login.css'
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
// const loginPage = () => async () => {
//   let item = {email,password}
//   let result = await fetch(`http://localhost:8081/api/user/oauth`,{
//     method : "POST",
//     header : {
//       "Content-type":"application/json",
//       "Accept":"application-json"
//     },
//     body:JSON.stringify(item)
//   });
//   result = result.json
// }

const handleLogin = (e) => {
  e.preventDefault();
  const data = {email:email,password:password}
  console.log(JSON.stringify(data))
  fetch(`http://localhost:8081/api/user/login`,{
    method:"POST",headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(data)
  }).then((res)=>{
    if(!res.ok){
      throw Error("failed to login")
    }
    return res.json()
  }).then((data)=>{
    console.log(data)
    if(data!==null){
      sessionStorage.setItem("userId",data.userId)
      sessionStorage.setItem("userName",data.userName)
      sessionStorage.setItem("role",data.role)
      sessionStorage.setItem("email",data.email)
    }
  })

  
};
  
return (
  <div className="login-container">
    <h2>Login</h2>
    <form className="login-cont" onSubmit={handleLogin}>
      <label htmlFor="email">Email:</label>
      <br/>
      <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <br/>
      <label htmlFor="password">Password:</label>
      <br/>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br/>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    <p>Create an account</p>
    <Link to="/signup">Signup</Link>
  </div>
);
}






