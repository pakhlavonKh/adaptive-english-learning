import controllers.AccountController;
import infrastructure.Database;
import infrastructure.EmailSystem;
import infrastructure.IExternalDataGateway;
import services.UserService;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- Starting User Subsystem ---");

        // 1. Setup Infrastructure
        Database db = new Database();
        EmailSystem email = new EmailSystem();
        
        // This is a "Lambda" - a quick way to implement the Interface without a new file
        // It pretends to be the external system fetching scores.
        IExternalDataGateway gateway = (studentId) -> "Math:80, Science:90, History:75"; 

        // 2. Setup Service and Controller
        UserService userService = new UserService(db, email, gateway);
        AccountController controller = new AccountController(userService);

        // 3. Test Registration
        System.out.println("\n--- Testing Registration ---");
        controller.register("Bejan", "bejan@ankarabilim.edu.tr", "securePass123");

        // 4. Test Email Verification
        System.out.println("\n--- Testing Email Verification ---");
        controller.verifyEmail("valid-token-123");
        
        System.out.println("\n--- System Check Complete ---");
    }
}