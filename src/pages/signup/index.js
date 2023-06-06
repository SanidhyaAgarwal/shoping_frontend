import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role="CUSTOMER";



  const handleSignUp = (e) => {
    e.preventDefault();
    const item = {userName:name,email:email,password:password,role:role}
    console.log(JSON.stringify(item))
    fetch(`http://localhost:8081/api/user/`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(item)})
    .then((res)=>{
      if(!res.ok){
        throw Error("cannot regitser user")
      }
      return res.json()
    }).then((data)=>{
      console.log(data)
    })
  };  


  return <div>
    <h2>Signup</h2>
    <form onSubmit={handleSignUp}>
      <label for="name">Name:</label>
      <br/>
      <input type="text" id="name" value={name} onChange={e=>setName(e.target.value)}/>
      <br/>
      <label for="email">Email:</label>
      <br/>
      <input type="text" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <br/>
      <label for="password">Password:</label>
      <br/>
      <input type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <br/>
      <button type="submit">Signup</button>
    </form>
    <p>Already have an account?</p>
    <Link to="/login">Login</Link>
  </div>;
}