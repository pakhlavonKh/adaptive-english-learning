import React, { useState } from 'react';
import { register } from '../api';

export default function Register({ onSwitchToLogin }){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const submit = async (e) =>{
    e.preventDefault();
    try{
      await register(username, password);
      setMsg('Registered — you can now login');
      setTimeout(() => onSwitchToLogin(), 2000);
    }catch(e){
      setMsg(e.response?.data?.error || 'Register failed');
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Register</h2>
      {msg && <div className="info">{msg}</div>}
      <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Register</button>
      <p className="auth-switch">Already have an account? <button type="button" className="link-button" onClick={onSwitchToLogin}>Login</button></p>
    </form>
  );
}
