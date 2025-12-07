const { Student, StudentProgress } = require('./models');

class AnalyticsService {

    // Sınıf metriklerini hesaplayan fonksiyon
    async getClassMetrics(classId) {
        console.log(`Sınıf (Class ID: ${classId}) için veriler çekiliyor...`);

        // 1. Tüm öğrencileri çek
        const students = await Student.find({});
        
        const reportData = [];

        // 2. Her öğrenci için döngü
        for (const student of students) {
            
            // Öğrencinin notunu bul
            const progress = await StudentProgress.findOne({ student_id: student._id });

            // Not yoksa 0 kabul et
            const retention = progress ? progress.retention_score : 0.0;
            
            // Risk Analizi: %50 altı riskli
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

    // Basit hesaplama fonksiyonu
    calculateRetention(correct, total) {
        if (total === 0) return 0;
        return (correct / total) * 100;
    }
}

module.exports = new AnalyticsService();