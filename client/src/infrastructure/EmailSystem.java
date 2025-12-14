package infrastructure;

public class EmailSystem {
    
    public void sendVerification(String email, String token) {
        // Simulated email sending - replace with real SMTP code in production
        System.out.println("[EmailSystem] Sending verification email to: " + email + " with token: " + token);
    }

    // FR17: Performance Alert Implementation
    public void sendPerformanceAlert(String studentId, double score) {
        // Design document (Figure 7) compliant method
        System.out.println("[EmailSystem] ALERT: Sending performance warning to student " + studentId + ". Current Score: " + score);
    }
}