const mongoose = require('mongoose');

// Öğrenci Şeması
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    current_level: { type: String, default: 'A1' }
});

// İlerleme Şeması (Progress)
const StudentProgressSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, // Öğrenciye referans
    lesson_id: { type: Number, required: true },
    retention_score: Number, // Hatırlama puanı
    accuracy_rate: Number,   // Doğruluk oranı
    last_updated: { type: Date, default: Date.now }
});

// Modelleri dışarı aktar
const Student = mongoose.model('Student', StudentSchema);
const StudentProgress = mongoose.model('StudentProgress', StudentProgressSchema);

module.exports = { Student, StudentProgress };