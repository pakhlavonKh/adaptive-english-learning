import React, { useState, useEffect } from "react";
import { getNextQuestion, submit, seed } from "../api";
import LearningPath from "./LearningPath";

function getLanguageCode() {
  return localStorage.getItem("languageCode") || "en";
}

function appendOfflineProgress(entry) {
  const key = "offlineProgress";
  const existingRaw = localStorage.getItem(key);
  const existing = existingRaw ? JSON.parse(existingRaw) : [];
  const list = Array.isArray(existing) ? existing : [existing];
  list.push(entry);
  localStorage.setItem(key, JSON.stringify(list));
}

export default function Dashboard({ token, user, onLogout }) {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null);
  const [showPath, setShowPath] = useState(false);

  const load = async () => {
    try {
      const lang = getLanguageCode();
      const q = await getNextQuestion(token, lang);

      if (q.message) {
        setQuestion(null);
        setStatus(q.message);
      } else {
        setQuestion(q);
        setStatus(null);
      }
    } catch (e) {
      setStatus(e.response?.data?.error || "Failed to load");
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) return;

    const userAnswer = (answer || "").trim();
    const correct =
      userAnswer.toLowerCase() === (question.answer || "").toLowerCase();

    const payload = {
      questionId: question.id,
      correct,
      // helpful metadata for sync/debugging
      languageCode: getLanguageCode(),
      answeredAt: new Date().toISOString()
    };

    try {
      const res = await submit(token, question.id, correct);
      setStatus(res.correct ? "Correct" : "Incorrect");
      setAnswer("");
      await load();
    } catch (e) {
      // ✅ If offline / network error, save progress locally for background sync
      const isNetworkError = !e.response; // axios: no response usually means network/offline
      if (isNetworkError) {
        appendOfflineProgress(payload);
        setStatus("Offline: progress saved and will sync when internet returns ✅");
        setAnswer("");
        await load();
        return;
      }

      setStatus(e.response?.data?.error || "Submit failed");
    }
  };

  return (
    <div className="container">
      <div className="top">
        <h2>Welcome, {user?.username}</h2>
        <div>
          <button onClick={onLogout}>Logout</button>
          <button
            onClick={async () => {
              await seed();
              await load();
            }}
          >
            Seed
          </button>
          <button onClick={() => setShowPath((s) => !s)}>
            {showPath ? "Hide" : "View"} Learning Path
          </button>
        </div>
      </div>

      {status && <div className="status">{status}</div>}

      {question ? (
        <form onSubmit={handleSubmit} className="card">
          <h3>{question.text}</h3>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="card">No questions due right now.</div>
      )}

      {showPath && (
        <div style={{ marginTop: 12 }}>
          <LearningPath token={token} />
        </div>
      )}
    </div>
  );
}
