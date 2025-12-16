import React, { useState, useEffect } from 'react';
import { getNextQuestion, submit, seed } from '../api';
import Support from './Support';

export default function Dashboard({ token, user, onLogout }){
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);
  const [showSupport, setShowSupport] = useState(false); // FR23: Support sayfası görünürlüğü

  const load = async () => {
    try{
      const q = await getNextQuestion(token);
      if(q.message){
        setQuestion(null);
        setStatus(q.message);
      } else {
        setQuestion(q);
        setStatus(null);
      }
    }catch(e){
      setStatus(e.response?.data?.error || 'Failed to load');
    }
  }

  useEffect(()=>{ load(); }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const correct = (answer || '').trim().toLowerCase() === (question.answer || '').toLowerCase();
    try{
      const res = await submit(token, question.id, correct);
      setStatus(res.correct ? 'Correct' : 'Incorrect');
      setAnswer('');
      await load();
    }catch(e){
      setStatus(e.response?.data?.error || 'Submit failed');
    }
  }

  // FR23: Support sayfası gösteriliyorsa, onu render et
  if (showSupport) {
    return <Support token={token} onBack={() => setShowSupport(false)} />;
  }

  return (
    <div className="container">
      <div className="top">
        <h2>Welcome, {user?.username}</h2>
        <div>
          <button onClick={() => setShowSupport(true)}>🎫 Help</button>
          <button onClick={onLogout}>Logout</button>
          <button onClick={async ()=>{ await seed(); await load(); }}>Seed</button>
        </div>
      </div>

      {status && <div className="status">{status}</div>}

      {question ? (
        <form onSubmit={handleSubmit} className="card">
          <h3>{question.text}</h3>
          <input value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Your answer" />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="card">No questions due right now.</div>
      )}
    </div>
  );
}
