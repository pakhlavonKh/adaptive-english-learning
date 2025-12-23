import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

/* ================= AUTH ================= */

export const register = (username, password) =>
  API.post("/register", { username, password }).then((r) => r.data);

export const login = (username, password) =>
  API.post("/login", { username, password }).then((r) => r.data);

/* ================= ASSESSMENT ================= */

export const getNextQuestion = (token, languageCode = "en") =>
  API.get("/next-question", {
    params: { languageCode },
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);

export const submit = (token, questionId, correct) =>
  API.post(
    "/submit",
    { questionId, correct },
    { headers: { Authorization: `Bearer ${token}` } }
  ).then((r) => r.data);

export const seed = () => API.get("/seed").then((r) => r.data);

/* ================= LEARNING PATH ================= */

export const getLearningPath = (token, languageCode = "en") =>
  API.get("/learning-path", {
    params: { languageCode },
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);

export const getModule = (token, id, languageCode = "en") =>
  API.get(`/module/${id}`, {
    params: { languageCode },
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);

export const createModule = (data) => API.post("/module", data).then((r) => r.data);

/* ================= LESSONS (LOCALIZATION) ================= */

export const getLessonContent = (lessonId, languageCode = "en") =>
  API.get(`/lessons/${lessonId}/content`, {
    params: { languageCode }
  }).then((r) => r.data);

export const createLesson = (data) => API.post("/lessons", data).then((r) => r.data);

export const addLessonTranslation = (lessonId, translation) =>
  API.post(`/lessons/${lessonId}/translations`, translation).then((r) => r.data);

/* ================= PROGRESS (BACKGROUND SYNC) ================= */

// ✅ Called when internet is restored to sync offline progress
// POST /api/progress/sync
export const syncProgress = (token, progressPayload) =>
  API.post("/progress/sync", progressPayload, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);

/* ================= AI FEATURES ================= */

// Get AI explanation for a concept
export const getAIExplanation = (token, concept, level = 'intermediate') =>
  API.post('/ai/explain', { concept, level }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);

// Generate AI practice question
export const generateAIQuestion = (token, topic, difficulty = 'intermediate', skillType = 'vocabulary') =>
  API.post('/ai/generate-question', { topic, difficulty, skillType }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);

// Get AI learning progress analysis
export const getAIAnalysis = (token) =>
  API.get('/ai/analyze-progress', {
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);

// Generate conversation practice
export const generateConversation = (token, topic, level = 'intermediate') =>
  API.post('/ai/conversation', { topic, level }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);

// Get AI writing correction
export const correctWriting = (token, text, focusArea = 'general') =>
  API.post('/ai/correct-writing', { text, focusArea }, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((r) => r.data);
