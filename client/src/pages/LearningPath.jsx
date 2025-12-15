import React, { useState, useEffect } from "react";
import { getLearningPath, getModule } from "../api";
import { saveLessonOffline } from "../utils/lessonStorage";

export default function LearningPath({ token }) {
  const [path, setPath] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [moduleContent, setModuleContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

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
    setLoading(true);
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
  }

  if (loading) return <div className="card">Loading...</div>;
  if (!path) return <div className="card">No learning path available.</div>;

  return (
    <div>
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
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
