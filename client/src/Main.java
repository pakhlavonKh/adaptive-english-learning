import controllers.AccountController;
import infrastructure.Database;
import infrastructure.EmailSystem;
import infrastructure.IExternalDataGateway;
import infrastructure.GoogleAuthProvider; // Import New Class
import services.UserService;
import models.Student;
import models.Role;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- Starting User Subsystem ---");

        // 1. Setup Infrastructure
        Database db = new Database();
        EmailSystem email = new EmailSystem();
        IExternalDataGateway gateway = (studentId) -> "Math:80, Science:90, History:75";
        
        // NEW: Setup Google Provider
        GoogleAuthProvider googleProvider = new GoogleAuthProvider();

        // 2. Setup Service (Pass the new googleProvider)
        UserService userService = new UserService(db, email, gateway, googleProvider);
        AccountController controller = new AccountController(userService);

        // ... (Keep your existing Registration/RBAC tests here if you want) ...

        // ==========================================
        // TEST SCENARIO: OAuth 2.0 (Google Login)
        // ==========================================
        System.out.println("\n--- Testing OAuth 2.0 (Google Login) ---");

        // Test 1: New User (Auto-Registration)
        System.out.println("[Test] User clicks 'Sign in with Google' (First Time)");
        controller.loginWithGoogle("valid-google-token-123"); 
        // Expected: Creates "bejan.google@gmail.com" and logs in

        // Test 2: Existing User (Login)
        System.out.println("\n[Test] User clicks 'Sign in with Google' (Second Time)");
        controller.loginWithGoogle("valid-google-token-123");
        // Expected: Finds "bejan.google@gmail.com" and logs in immediately

        System.out.println("\n--- System Check Complete ---");
    }
}