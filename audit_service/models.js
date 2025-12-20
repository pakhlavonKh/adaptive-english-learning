const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    action: String,       //  "LOGIN", "EXPORT_PDF", "DELETE_USER"
    user: String,         //  "admin@fab.com", "teacher_101"
    details: String,      //  "Class 101 report downloaded"
    ip_address: String,   // IP address for security
    status: String,       // "SUCCESS" or "FAILURE"
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);