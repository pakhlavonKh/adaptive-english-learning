<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { getLearningPath, getModule, submit } from '../api';
import { ChevronRight, CheckCircle, XCircle } from 'lucide-react';
=======
import React, { useState, useEffect } from "react";
import { getLearningPath, getModule } from "../api";
import { saveLessonOffline } from "../utils/lessonStorage";
>>>>>>> origin/zerda

export default function LearningPath({ token }) {
  const [path, setPath] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [moduleContent, setModuleContent] = useState(null);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
=======
  const [savedMsg, setSavedMsg] = useState("");
>>>>>>> origin/zerda

  // ✅ Per-user language setting (stored on device)
  const [languageCode, setLanguageCode] = useState(
    localStorage.getItem("languageCode") || "en"
  );

  useEffect(() => {
    localStorage.setItem("languageCode", languageCode);
    // Dil değişince learning path’i yeniden çekelim
    loadPath(languageCode);
    // açık modül varsa kapatalım (istersen kaldırabilirsin)
    setModuleContent(null);
    setActiveModule(null);
  }, [languageCode]);

  useEffect(() => {
    loadPath(languageCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPath(lang = languageCode) {
    setLoading(true);
    setSavedMsg("");
    try {
      const data = await getLearningPath(token, lang);
      setPath(data);
    } catch (e) {
      console.error(e);
      setSavedMsg("❌ Failed to load learning path.");
    } finally {
      setLoading(false);
    }
  }

  async function openModule(m) {
    setActiveModule(m);
    setActiveQuestion(null);
    setFeedback(null);
    setLoading(true);
<<<<<<< HEAD
    try{
      const moduleId = m._id || m.id;
      console.log('🔍 Loading module:', moduleId);
      const mod = await getModule(token, moduleId);
      console.log('📦 Module data received:', mod);
      console.log('   Items count:', mod?.items?.length || 0);
      console.log('   Exercises count:', mod?.exercises?.length || 0);
      if (mod?.items?.length > 0) {
        console.log('   First item:', mod.items[0]);
      }
      setModuleContent(mod);
    }catch(e){ 
      console.error('❌ Error loading module:', e);
      alert('Failed to load module. Check console for details.');
    }
    finally{ setLoading(false); }
=======
    setSavedMsg("");
    try {
      const mod = await getModule(token, m.id, languageCode);
      setModuleContent(mod);
    } catch (e) {
      console.error(e);
      setSavedMsg("❌ Failed to open module.");
    } finally {
      setLoading(false);
    }
  }

  async function downloadModule(m) {
    setSavedMsg("");
    try {
      await saveLessonOffline(m.id, languageCode);
      setSavedMsg(
        `✅ Lesson saved for offline use (${languageCode}): ${m.title}`
      );
    } catch (e) {
      console.error(e);
      setSavedMsg("❌ Failed to save lesson offline.");
    }
>>>>>>> origin/zerda
  }

  async function handleAnswerSubmit(e, item){
    e.preventDefault();
    if(!item.question) return;
    
    const correct = (answer || '').trim().toLowerCase() === (item.question.answer || '').toLowerCase();
    try{
      const res = await submit(token, item.question._id, correct);
      setFeedback({
        correct: res.correct,
        message: res.correct ? '✓ Correct!' : '✗ Incorrect. Try again!'
      });
      setAnswer('');
      setTimeout(() => setFeedback(null), 2000);
    }catch(e){
      setFeedback({ correct: false, message: 'Failed to submit' });
    }
  }

  if (loading && !path) return <div style={{padding:'20px',textAlign:'center'}}>Loading...</div>;
  if (!path) return <div style={{padding:'20px',textAlign:'center'}}>No learning path available.</div>;

  return (
    <div>
<<<<<<< HEAD
      <div style={{marginBottom:'20px'}}>
        <h4 style={{marginBottom:'12px',color:'#667eea'}}>
          Suggested Level: {path.suggestedLevel} | Your Ability: {path.theta.toFixed(2)}
        </h4>
        <p style={{color:'#666',marginBottom:'16px'}}>Recommended modules sorted by fit:</p>
        <div style={{display:'grid',gap:'12px'}}>
          {path.modules.map(m => {
            const moduleId = m._id || m.id;
            const activeModuleId = activeModule?._id || activeModule?.id;
            const isActive = activeModuleId === moduleId;
            
            return (
              <div key={moduleId} style={{
                padding:'16px',
                background:'#f9fafb',
                borderRadius:'8px',
                border: isActive ? '2px solid #667eea' : '1px solid #e0e0e0',
                cursor:'pointer',
                transition:'all 0.3s ease'
              }}
              onClick={()=>{
                console.log('Module clicked:', m.title);
                openModule(m);
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <strong style={{color:'#1a1a1a',fontSize:'16px'}}>{m.title}</strong>
                    <div style={{color:'#666',fontSize:'14px',marginTop:'4px'}}>
                      {m.skill} • Level {m.level}
                    </div>
                  </div>
                  <ChevronRight size={20} color="#667eea" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {moduleContent && (
        <div style={{
          background:'white',
          padding:'24px',
          borderRadius:'12px',
          border:'1px solid #e0e0e0',
          marginTop:'20px'
        }}>
          <h3 style={{color:'#1a1a1a',marginBottom:'8px'}}>{moduleContent.title}</h3>
          <p style={{color:'#666',marginBottom:'20px'}}>{moduleContent.description}</p>
          <h4 style={{color:'#667eea',marginBottom:'16px'}}>Practice Items</h4>
          <div style={{display:'grid',gap:'16px'}}>
            {(moduleContent.items || []).map((it, idx) => (
              <div key={idx} style={{
                padding:'16px',
                background:'#f9fafb',
                borderRadius:'8px',
                border:'1px solid #e0e0e0'
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:'12px'}}>
                  <strong style={{color:'#1a1a1a'}}>{it.title}</strong>
                  <span style={{
                    fontSize:'12px',
                    padding:'4px 8px',
                    background:'#fff3cd',
                    color:'#856404',
                    borderRadius:'4px',
                    fontWeight:'600'
                  }}>
                    Difficulty: {it.difficulty?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                
                {it.question ? (
                  <div>
                    <p style={{color:'#333',marginBottom:'12px',fontStyle:'italic'}}>
                      Q: {it.question.text}
                    </p>
                    <form onSubmit={(e) => handleAnswerSubmit(e, it)} style={{display:'flex',gap:'8px',alignItems:'center'}}>
                      <input 
                        type="text"
                        value={activeQuestion === idx ? answer : ''}
                        onChange={(e) => {
                          setActiveQuestion(idx);
                          setAnswer(e.target.value);
                        }}
                        onFocus={() => setActiveQuestion(idx)}
                        placeholder="Your answer..."
                        style={{
                          flex:1,
                          padding:'10px 12px',
                          border:'2px solid #e0e0e0',
                          borderRadius:'6px',
                          fontSize:'14px'
                        }}
                      />
                      <button type="submit" style={{
                        padding:'10px 20px',
                        background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color:'white',
                        border:'none',
                        borderRadius:'6px',
                        fontWeight:'600',
                        cursor:'pointer',
                        display:'flex',
                        alignItems:'center',
                        gap:'6px'
                      }}>
                        Submit
                        <ChevronRight size={16} />
                      </button>
                    </form>
                    {feedback && activeQuestion === idx && (
                      <div style={{
                        marginTop:'8px',
                        padding:'8px 12px',
                        background: feedback.correct ? '#d4edda' : '#f8d7da',
                        color: feedback.correct ? '#155724' : '#721c24',
                        borderRadius:'6px',
                        fontSize:'14px',
                        fontWeight:'600',
                        display:'flex',
                        alignItems:'center',
                        gap:'8px'
                      }}>
                        {feedback.correct ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        {feedback.message}
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{color:'#999',fontSize:'14px'}}>No question linked to this item</p>
                )}
              </div>
=======
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label htmlFor="lang" style={{ fontWeight: 600 }}>
            Language:
          </label>
          <select
            id="lang"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value)}
          >
            <option value="en">English</option>
            <option value="tr">Turkish</option>
          </select>
          <span style={{ opacity: 0.7 }}>(saved per user/device)</span>
        </div>
      </div>

      <div className="card">
        <h3>
          Suggested level: {path.suggestedLevel} — theta:{" "}
          {path.theta?.toFixed ? path.theta.toFixed(2) : path.theta}
        </h3>

        {savedMsg && <p style={{ marginTop: 10 }}>{savedMsg}</p>}

        <p>Recommended modules (sorted by fit):</p>
        <ul>
          {path.modules.map((m) => (
            <li key={m.id} style={{ margin: "8px 0" }}>
              <strong>{m.title}</strong> — {m.skill} (level {m.level})
              <div style={{ marginTop: 6 }}>
                <button onClick={() => openModule(m)}>Open Module</button>

                <button
                  onClick={() => downloadModule(m)}
                  style={{ marginLeft: 8 }}
                >
                  Download Lesson
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {moduleContent && (
        <div className="card" style={{ marginTop: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>{moduleContent.title}</h3>

            <button onClick={() => downloadModule(activeModule)}>
              Download this module
            </button>
          </div>

          <p>{moduleContent.description}</p>

          <h4>Items</h4>
          <ol>
            {moduleContent.items.map((it) => (
              <li key={it.id} style={{ margin: "8px 0" }}>
                <strong>{it.title}</strong> — {it.type} — difficulty:{" "}
                {it.difficulty}
                <div style={{ marginTop: 6 }}>
                  {it.question ? (
                    <em>Q: {it.question.text}</em>
                  ) : (
                    <em>No linked question</em>
                  )}
                </div>
              </li>
>>>>>>> origin/zerda
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
