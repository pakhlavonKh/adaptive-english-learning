package infrastructure;

public class GoogleAuthProvider implements IOAuthProvider {
    public String verifyTokenAndGetEmail(String token) {
        // Simulating Google's server verification
        if (token.startsWith("valid-google-token")) {
            System.out.println("[GoogleAuthProvider] Token verified successfully.");
            // In a real app, this email comes from the Google payload
            return "bejan.google@gmail.com"; 
        } else {
            System.out.println("[GoogleAuthProvider] Invalid OAuth token.");
            return null;
        }
    }
}