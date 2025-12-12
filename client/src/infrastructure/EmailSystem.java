package infrastructure;

public class EmailSystem {
    
    public void sendVerification(String email, String token) {
        // Simüle edilmiş e-posta gönderimi
        System.out.println("[EmailSystem] Sending verification email to: " + email + " with token: " + token);
    }

    // FR17: Performance Alert Implementation (Serenay Task)
    public void sendPerformanceAlert(String studentId, double score) {
        // Tasarım dokümanına (Figure 7) uygun metod
        System.out.println("[EmailSystem] ALERT: Sending performance warning to student " + studentId + ". Current Score: " + score);
    }
}