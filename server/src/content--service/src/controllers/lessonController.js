const lessonService = require("../services/lessonService");

async function createLesson(req, res) {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    console.error("createLesson error:", err);
    res.status(500).json({ message: "Error creating lesson" });
  }
}

async function getLesson(req, res) {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json(lesson);
  } catch (err) {
    console.error("getLesson error:", err);
    res.status(500).json({ message: "Error fetching lesson" });
  }
}

async function listLessons(req, res) {
  try {
    const { topic, level, isActive } = req.query;
    const filter = {
      topic,
      level,
      isActive: isActive !== undefined ? isActive === "true" : undefined
    };

    const lessons = await lessonService.listLessons(filter);
    res.json(lessons);
  } catch (err) {
    console.error("listLessons error:", err);
    res.status(500).json({ message: "Error listing lessons" });
  }
}

module.exports = {
  createLesson,
  getLesson,
  listLessons
};
