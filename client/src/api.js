import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

/* ================= AUTH ================= */

export const register = (username, password) =>
  API.post("/register", { username, password }).then(r => r.data);

export const login = (username, password) =>
  API.post("/login", { username, password }).then(r => r.data);

/* ================= ASSESSMENT ================= */

export const getNextQuestion = (token, languageCode = "en") =>
  API.get("/next-question", {
    params: { languageCode },
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);

export const submit = (token, questionId, correct) =>
  API.post(
    "/submit",
    { questionId, correct },
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(r => r.data);

export const seed = () =>
  API.get("/seed").then(r => r.data);

/* ================= LEARNING PATH ================= */

// ✅ languageCode eklendi
export const getLearningPath = (token, languageCode = "en") =>
  API.get("/learning-path", {
    params: { languageCode },
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);

// ✅ languageCode eklendi
export const getModule = (token, id, languageCode = "en") =>
  API.get(`/module/${id}`, {
    params: { languageCode },
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);

export const createModule = (data) =>
  API.post("/module", data).then(r => r.data);

/* ================= LESSONS (LOCALIZATION) ================= */

// ✅ Localized lesson content
// GET /api/lessons/:lessonId/content?languageCode=en
export const getLessonContent = (lessonId, languageCode = "en") =>
  API.get(`/lessons/${lessonId}/content`, {
    params: { languageCode }
  }).then(r => r.data);

// ✅ Create lesson (admin / seed)
export const createLesson = (data) =>
  API.post("/lessons", data).then(r => r.data);

// ✅ Add / update translation
// POST /api/lessons/:id/translations
export const addLessonTranslation = (lessonId, translation) =>
  API.post(`/lessons/${lessonId}/translations`, translation)
    .then(r => r.data);
