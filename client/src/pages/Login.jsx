import React, { useState } from 'react';
import { login } from '../api';

export default function Login({ onLogin }){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  const submit = async (e) =>{
    e.preventDefault();
    try{
      const res = await login(username, password);
      onLogin(res.token, res.user);
    }catch(e){
      setErr(e.response?.data?.error || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Login</h2>
      {err && <div className="error">{err}</div>}
      <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
