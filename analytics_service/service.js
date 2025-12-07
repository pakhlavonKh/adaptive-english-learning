const { Student, StudentProgress } = require('./models');

class AnalyticsService {

    // Function to calculate class metrics
    async getClassMetrics(classId) {
        console.log(`Sınıf (Class ID: ${classId}) için veriler çekiliyor...`);

        // 1. Fetch all students
        const students = await Student.find({});
        
        const reportData = [];

        // 2. Loop through each student
        for (const student of students) {
            
            // Find the student's progress record
            const progress = await StudentProgress.findOne({ student_id: student._id });

            // Assume 0.0 if no record exists
            const retention = progress ? progress.retention_score : 0.0;
            
            // Risk Analysis: Below 50% is considered risky
            const isRisky = retention < 50.0;

            reportData.push({
                id: student._id,
                name: student.name,
                level: student.current_level,
                retention: retention,
                risk: isRisky
            });
        }

        return reportData;
    }

    // Helper function for simple calculations
    calculateRetention(correct, total) {
        if (total === 0) return 0;
        return (correct / total) * 100;
    }
}

module.exports = new AnalyticsService();
