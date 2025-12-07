const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const analyticsService = require('./service');

const app = express();
const PORT = 8000; // Python ile aynı portu kullanalım

// Middleware (CORS izni ve JSON okuma)
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
const MONGO_URI = 'mongodb://localhost:27017/learning_db';
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Bağlantısı Başarılı"))
    .catch(err => console.error("❌ MongoDB Bağlantı Hatası:", err));

// --- API ENDPOINTS ---

// Ana sayfa testi
app.get('/', (req, res) => {
    res.json({ message: "Analytics Service (Node.js) Çalışıyor! 🚀" });
});

// Sınıf Raporu Endpoint'i
app.get('/api/reports/class/:classId', async (req, res) => {
    const classId = req.params.classId;
    
    try {
        const report = await analyticsService.getClassMetrics(classId);
        res.json({
            class_id: classId,
            data: report
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});