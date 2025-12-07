import React, { useState, useEffect } from 'react';
import { getLearningPath, getModule } from '../api';

export default function LearningPath({ token }){
  const [path, setPath] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [moduleContent, setModuleContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ loadPath(); }, []);

  async function loadPath(){
    setLoading(true);
    try{
      const data = await getLearningPath(token);
      setPath(data);
    }catch(e){
      console.error(e);
    }finally{ setLoading(false); }
  }

  async function openModule(m){
    setActiveModule(m);
    setLoading(true);
    try{
      const mod = await getModule(token, m.id);
      setModuleContent(mod);
    }catch(e){ console.error(e); }
    finally{ setLoading(false); }
  }

  if (loading) return <div className="card">Loading...</div>;
  if (!path) return <div className="card">No learning path available.</div>;

  return (
    <div>
      <div className="card">
        <h3>Suggested level: {path.suggestedLevel} — theta: {path.theta.toFixed(2)}</h3>
        <p>Recommended modules (sorted by fit):</p>
        <ul>
          {path.modules.map(m => (
            <li key={m.id} style={{margin:'8px 0'}}>
              <strong>{m.title}</strong> — {m.skill} (level {m.level})
              <div><button onClick={()=>openModule(m)}>Open Module</button></div>
            </li>
          ))}
        </ul>
      </div>

      {moduleContent && (
        <div className="card" style={{marginTop:12}}>
          <h3>{moduleContent.title}</h3>
          <p>{moduleContent.description}</p>
          <h4>Items</h4>
          <ol>
            {moduleContent.items.map(it => (
              <li key={it.id} style={{margin:'8px 0'}}>
                <strong>{it.title}</strong> — {it.type} — difficulty: {it.difficulty}
                <div style={{marginTop:6}}>{it.question ? <em>Q: {it.question.text}</em> : <em>No linked question</em>}</div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
