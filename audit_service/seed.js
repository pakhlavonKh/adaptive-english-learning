const mongoose = require('mongoose');
const AuditLog = require('./models');

mongoose.connect('mongodb://127.0.0.1:27017/learning_db')
    .then(() => console.log("✅ Connected to MongoDB (Audit)"))
    .catch(err => console.error("❌ Connection Error:", err));

const seedData = async () => {
    await AuditLog.deleteMany({});
    
    const actions = [
        { action: "LOGIN", user: "teacher_101", details: "Successful login", ip: "192.168.1.10", status: "SUCCESS" },
        { action: "LOGIN_FAILED", user: "unknown_user", details: "Invalid password attempt", ip: "45.12.99.1", status: "FAILURE" }, // Şüpheli!
        { action: "EXPORT_PDF", user: "teacher_101", details: "Downloaded Class 101 Report", ip: "192.168.1.10", status: "SUCCESS" },
        { action: "VIEW_DASHBOARD", user: "admin", details: "Viewed System Stats", ip: "10.0.0.5", status: "SUCCESS" },
        { action: "DELETE_STUDENT", user: "admin", details: "Deleted student ID: 55", ip: "10.0.0.5", status: "SUCCESS" }
    ];

    // Randomly distribute to past dates
    for (let log of actions) {
        await AuditLog.create({
            action: log.action,
            user: log.user,
            details: log.details,
            ip_address: log.ip,
            status: log.status,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000))
        });
    }

    console.log("✅ Audit Logs Seeded!");
    mongoose.connection.close();
};

seedData();