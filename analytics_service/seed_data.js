const mongoose = require('mongoose');
const { Student, StudentProgress } = require('./models');

// MongoDB Bağlantısı (Arkadaşının veritabanı adını buraya yazabilirsin)
const MONGO_URI = 'mongodb://localhost:27017/learning_db';

const seed = async () => {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB'ye bağlanıldı...");

    // Önce temizle (Test için)
    await Student.deleteMany({});
    await StudentProgress.deleteMany({});
    console.log("Eski veriler temizlendi.");

    // 1. Öğrencileri Ekle
    const s1 = await Student.create({ name: "Mehmet Yilmaz", email: "mehmet@okul.com", current_level: "A2" });
    const s2 = await Student.create({ name: "Zeynep Kaya", email: "zeynep@okul.com", current_level: "B1" });
    const s3 = await Student.create({ name: "Can Demir", email: "can@okul.com", current_level: "A1" });

    // 2. Notları Ekle
    await StudentProgress.create([
        { student_id: s1._id, lesson_id: 1, retention_score: 85.0, accuracy_rate: 90.0 },
        { student_id: s2._id, lesson_id: 1, retention_score: 60.0, accuracy_rate: 70.0 },
        { student_id: s3._id, lesson_id: 1, retention_score: 30.0, accuracy_rate: 40.0 }
    ]);

    console.log("✅ Başarılı: Veriler eklendi!");
    process.exit();
};

seed();