const mongoose = require('mongoose');
const { Student, StudentProgress } = require('./models');

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/learning_db')
    .then(() => console.log("✅ Connected to MongoDB for Seeding"))
    .catch(err => console.error("❌ Connection Error:", err));

const seedDB = async () => {
    try {
        // Clean First
        await Student.deleteMany({});
        await StudentProgress.deleteMany({});
        console.log("🧹 Old data cleared...");

        // 1. Create Students
        const s1 = await Student.create({ name: "Ali Yilmaz", email: "ali@test.com", current_level: "B1" });
        const s2 = await Student.create({ name: "Ayse Demir", email: "ayse@test.com", current_level: "A2" });
        const s3 = await Student.create({ name: "Mehmet Oz", email: "mehmet@test.com", current_level: "C1" });
        const s4 = await Student.create({ name: "Zeynep Kaya", email: "zeynep@test.com", current_level: "A1" });
        const s5 = await Student.create({ name: "Canan Dag", email: "canan@test.com", current_level: "B2" });

        // 2. Create Notes (Progress)
        // Added 'lesson_id: 101' to each
        // Ali: Good
        await StudentProgress.create({ 
            student_id: s1._id, 
            lesson_id: 101,  // <-- Added
            retention_score: 85.5, 
            last_activity_date: new Date() 
        });

        // Ayşe: Risky
        await StudentProgress.create({ 
            student_id: s2._id, 
            lesson_id: 101,  // <-- Added
            retention_score: 42.0, 
            last_activity_date: new Date() 
        });

        // Mehmet: Super
        await StudentProgress.create({ 
            student_id: s3._id, 
            lesson_id: 101,  // <-- Added
            retention_score: 92.0, 
            last_activity_date: new Date() 
        });

        // Zeynep: Very Risky
        await StudentProgress.create({ 
            student_id: s4._id, 
            lesson_id: 101,  // <-- Added
            retention_score: 30.5, 
            last_activity_date: new Date() 
        });

        // Canan: Medium
        await StudentProgress.create({ 
            student_id: s5._id, 
            lesson_id: 101,  // <-- Added
            retention_score: 65.0, 
            last_activity_date: new Date() 
        });

        console.log("✅ Database Seeded Successfully! (Added datas)")

    } catch (err) {
        console.error("❌ Seeding Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();