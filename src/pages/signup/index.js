import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return <div>
    <h2>Signup</h2>
    <form onSubmit={e=>{
      e.preventDefault();
    }}>
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