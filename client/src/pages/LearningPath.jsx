import React, { useState, useEffect } from "react";
import { getLearningPath, getModule, submit, getAIExplanation, generateAIQuestion } from "../api";

export default function LearningPath({ token }) {
  const [path, setPath] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [moduleContent, setModuleContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [aiExplanation, setAiExplanation] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    loadPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPath() {
    setLoading(true);
    setError("");
    try {
      const data = await getLearningPath(token);
      console.log('Learning path loaded:', data);
      setPath(data);
    } catch (e) {
      console.error('Failed to load learning path:', e);
      setError("Failed to load learning path. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function openModule(m) {
    setActiveModule(m);
    setActiveQuestion(null);
    setFeedback(null);
    setAiExplanation(null);
    setLoading(true);
    setError("");
    try {
      console.log('Opening module:', m);
      const mod = await getModule(token, m.id);
      console.log('Module content loaded:', mod);
      setModuleContent(mod);
    } catch (e) {
      console.error('Failed to load module:', e);
      setError("Failed to open module.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAnswerSubmit(e, item) {
    e.preventDefault();
    if (!item.question) return;
    
    const userAnswer = (answer || '').trim();
    const correct = userAnswer.toLowerCase() === (item.question.answer || '').toLowerCase();
    
    try {
      const res = await submit(token, item.question._id, correct);
      setFeedback({
        correct: res.correct,
        message: res.correct ? '✅ Correct! Great job!' : '❌ Incorrect. Try again!'
      });
      setAnswer('');
      
      // Get AI explanation after answering incorrectly
      if (!res.correct) {
        getAIHelp(item.question.text);
      }
    } catch (e) {
      console.error('Submit error:', e);
      setFeedback({ correct: false, message: 'Failed to submit answer.' });
    }
  }

  async function getAIHelp(concept) {
    setLoadingAI(true);
    setAiExplanation(null);
    try {
      const result = await getAIExplanation(token, concept, 'intermediate');
      setAiExplanation(result.explanation);
    } catch (e) {
      console.error('AI explanation error:', e);
      setAiExplanation('AI explanation not available at this time.');
    } finally {
      setLoadingAI(false);
    }
  }

  async function generatePracticeQuestion(skill, difficulty) {
    setLoadingAI(true);
    try {
      const result = await generateAIQuestion(token, skill, difficulty, skill);
      setActiveQuestion({
        text: result.question,
        answer: result.answer,
        isAIGenerated: true
      });
    } catch (e) {
      console.error('AI question generation error:', e);
      setError('Failed to generate AI question.');
    } finally {
      setLoadingAI(false);
    }
  }

  if (loading && !path) {
    return (
      <div className="learning-path-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your personalized learning path...</p>
        </div>
      </div>
    );
  }

  if (error && !path) {
    return (
      <div className="learning-path-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadPath} className="btn-retry">Try Again</button>
        </div>
      </div>
    );
  }

  if (!path) {
    return (
      <div className="learning-path-container">
        <div className="empty-state">
          <h3>No Learning Path Available</h3>
          <p>Complete the initial assessment to generate your personalized learning path.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-path-container">
      <div className="learning-path-header">
        <h2>🎯 Your AI-Powered Learning Path</h2>
        <div className="path-stats">
          <div className="stat-item">
            <span className="stat-label">Your Level</span>
            <span className="stat-value">{path.suggestedLevel || 'Beginner'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Ability Score (θ)</span>
            <span className="stat-value">{path.theta?.toFixed(2) || '0.00'}</span>
          </div>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {!activeModule ? (
        <div className="modules-grid">
          <h3 className="section-title">Recommended Modules</h3>
          <div className="modules-list">
            {path.modules && path.modules.length > 0 ? (
              path.modules.map((m) => (
                <div key={m.id} className="module-card">
                  <div className="module-header">
                    <h4>{m.title}</h4>
                    <span className="module-skill">{m.skill}</span>
                  </div>
                  <p className="module-level">Level {m.level}</p>
                  <button 
                    onClick={() => openModule(m)} 
                    className="btn-open-module"
                  >
                    Start Module →
                  </button>
                  <button 
                    onClick={() => generatePracticeQuestion(m.skill, m.level)}
                    className="btn-ai-practice"
                    disabled={loadingAI}
                  >
                    🤖 AI Practice
                  </button>
                </div>
              ))
            ) : (
              <p className="no-modules">No modules available yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="module-content">
          <button onClick={() => {
            setActiveModule(null);
            setModuleContent(null);
            setActiveQuestion(null);
            setFeedback(null);
            setAiExplanation(null);
          }} className="btn-back">
            ← Back to Modules
          </button>

          <div className="module-detail">
            <h3>{moduleContent?.title || activeModule.title}</h3>
            <p className="module-description">{moduleContent?.description || ''}</p>

            {moduleContent?.items && moduleContent.items.length > 0 ? (
              <div className="questions-list">
                <h4>Practice Questions</h4>
                {moduleContent.items.map((item, index) => (
                  <div key={item.id || index} className="question-item">
                    <div className="question-header">
                      <span className="question-number">#{index + 1}</span>
                      <span className="question-type">{item.type}</span>
                      <span className="question-difficulty">Difficulty: {item.difficulty}</span>
                    </div>
                    {item.question ? (
                      <div className="question-content">
                        <p className="question-text">{item.question.text}</p>
                        <form onSubmit={(e) => handleAnswerSubmit(e, item)}>
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Your answer..."
                            className="question-input"
                          />
                          <button type="submit" className="btn-submit-answer">
                            Submit Answer
                          </button>
                        </form>
                        {feedback && (
                          <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
                            {feedback.message}
                          </div>
                        )}
                        {!feedback && (
                          <button
                            onClick={() => getAIHelp(item.question.text)}
                            className="btn-ai-help"
                            disabled={loadingAI}
                          >
                            {loadingAI ? 'Loading...' : '💡 Get AI Help'}
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="no-question">Question not available</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-questions">No questions in this module yet.</p>
            )}

            {aiExplanation && (
              <div className="ai-explanation">
                <h4>🤖 AI Explanation</h4>
                <p>{aiExplanation}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeQuestion && activeQuestion.isAIGenerated && (
        <div className="ai-generated-question">
          <h4>🤖 AI Generated Practice Question</h4>
          <p className="question-text">{activeQuestion.text}</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const correct = answer.toLowerCase().trim() === activeQuestion.answer.toLowerCase().trim();
            setFeedback({
              correct,
              message: correct ? '✅ Correct!' : `❌ The answer is: ${activeQuestion.answer}`
            });
            setAnswer('');
          }}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your answer..."
              className="question-input"
            />
            <button type="submit" className="btn-submit-answer">Submit</button>
          </form>
          {feedback && (
            <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
              {feedback.message}
            </div>
          )}
          <button onClick={() => setActiveQuestion(null)} className="btn-close">Close</button>
        </div>
      )}
    </div>
  );
}
