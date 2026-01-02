package infrastructure;

public interface IOAuthProvider {
    // Returns the email if token is valid, or null if invalid
    String verifyTokenAndGetEmail(String token);
}