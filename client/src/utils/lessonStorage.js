// client/src/utils/lessonStorage.js

const STORAGE_KEY = "offline_lessons";

export function saveLessonOffline(lesson) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  existing[lesson._id] = lesson;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getOfflineLesson(lessonId) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  return existing[lessonId] || null;
}

export function getAllOfflineLessons() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}
