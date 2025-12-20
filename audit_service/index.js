const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AuditLog = require('./models');

const app = express();
const PORT = 8001; 

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/learning_db')
    .then(() => console.log("✅ Audit Service DB Connected"))
    .catch(err => console.error(err));

// --- API: Bring Logs ---
app.get('/api/audit-logs', async (req, res) => {
    try {
        // Sort the oldest again
        const logs = await AuditLog.find().sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`🛡️ Audit Service running on port ${PORT}`));