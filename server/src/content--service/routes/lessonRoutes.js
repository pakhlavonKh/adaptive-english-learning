const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

// POST /api/lessons
router.post("/", lessonController.createLesson);



// ✅ GET /api/lessons/:lessonId/content
router.get("/:lessonId/content", lessonController.getLessonContent);

// GET /api/lessons/:id
router.get("/:id", lessonController.getLesson);


// GET /api/lessons?topic=...&level=...
router.get("/", lessonController.listLessons);

module.exports = router;
