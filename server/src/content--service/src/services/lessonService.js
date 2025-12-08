const Lesson = require("../models/Lesson");
const LessonTranslation = require("../models/LessonTranslation");
const MediaAsset = require("../models/MediaAsset");

// Yeni lesson + çeviri + media oluştur
async function createLesson(data) {
  const { translations, mediaAssets, ...lessonData } = data;

  try {
    const lesson = await Lesson.create(lessonData);

    // translations
    if (Array.isArray(translations)) {
      const trDocs = translations.map((t) => ({
        lesson: lesson._id,
        languageCode: t.languageCode,
        title: t.title,
        summary: t.summary,
        contentHtml: t.contentHtml
      }));
      await LessonTranslation.insertMany(trDocs);
    }

    // media
    if (Array.isArray(mediaAssets)) {
      const mediaDocs = mediaAssets.map((m) => ({
        lesson: lesson._id,
        mediaType: m.mediaType,
        url: m.url,
        caption: m.caption,
        languageCode: m.languageCode
      }));
      await MediaAsset.insertMany(mediaDocs);
    }

    return getLessonById(lesson._id);
  } catch (err) {
    console.error("Lesson create error:", err);
    throw err;
  }
}

async function getLessonById(id) {
  const lesson = await Lesson.findById(id).lean();
  if (!lesson) return null;

  const translations = await LessonTranslation.find({ lesson: id }).lean();
  const mediaAssets = await MediaAsset.find({ lesson: id }).lean();

  return { ...lesson, translations, mediaAssets };
}

async function listLessons(filter = {}) {
  const query = {};
  if (filter.topic) query.topic = filter.topic;
  if (filter.level) query.level = filter.level;
  if (filter.isActive !== undefined) query.isActive = filter.isActive;

  return Lesson.find(query).lean();
}

module.exports = {
  createLesson,
  getLessonById,
  listLessons
};
