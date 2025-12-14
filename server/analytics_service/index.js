const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const analyticsService = require('./service');

const app = express();
const PORT = 8000; 

// Middleware (Enable CORS and JSON parsing)
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/learning_db';
mongoose.connect(MONGO_URI)
    .then(() => console.log(" MongoDB Connection Successfull"))
    .catch(err => console.error(" MongoDB Connection Error:", err));

// --- API ENDPOINTS ---

// Homepage Test Route
app.get('/', (req, res) => {
    res.json({ message: "Analytics Service (Node.js) Çalışıyor! 🚀" });
});

// Class Report Endpoint
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

// Class Average Endpoint (FR11)
app.get('/api/reports/class/:classId/average', async (req, res) => {
    const classId = req.params.classId;
    try {
        // Call the new math function
        const stats = await analyticsService.calculateClassAverage(classId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
