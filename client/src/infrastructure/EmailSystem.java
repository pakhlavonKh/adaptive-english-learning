package infrastructure;

public class EmailSystem {
    public void sendVerification(String email, String token) {
        // Later, you will replace this print statement with real SMTP code
        System.out.println("[EmailSystem] Sending verification email to: " + email + " with token: " + token);
    }
}