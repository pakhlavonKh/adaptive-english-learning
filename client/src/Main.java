import controllers.AccountController;
import infrastructure.Database;
import infrastructure.EmailSystem;
import infrastructure.IExternalDataGateway;
import services.UserService;
import models.Student; // Required to see the User object
import models.Role;    // Required to check the Role

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

        // ==========================================
        // TEST SCENARIO 1: Registration (Standard)
        // ==========================================
        System.out.println("\n--- Testing Registration ---");
        // We register "Bejan". By default, the Student constructor sets Role = STUDENT.
        controller.register("Bejan", "bejan@ankarabilim.edu.tr", "securePass123");

        System.out.println("\n--- Testing Email Verification ---");
        controller.verifyEmail("valid-token-123");


        // ==========================================
        // TEST SCENARIO 2: RBAC (Security Check)
        // ==========================================
        System.out.println("\n--- Testing RBAC (Role Based Access Control) ---");

        // 1. Login Logic
        System.out.println("[Test] Attempting login for Bejan...");
        Student currentUser = userService.login("bejan@ankarabilim.edu.tr", "securePass123");
        
        if (currentUser != null) {
            System.out.println("Logged in as: " + currentUser.username + " [Role: " + currentUser.role + "]");

            // 2. Guardrail Test: Student trying to access Teacher Dashboard
            System.out.println("[Test] " + currentUser.username + " is trying to open Teacher Dashboard...");
            
            if (currentUser.role == Role.TEACHER) {
                System.out.println(">> Access Granted: Opening Teacher Dashboard...");
            } else {
                System.out.println(">> Access Denied: You must be a TEACHER to view this page.");
            }
        }

        // 3. Admin Action: Promotion
        System.out.println("\n[Admin] Promoting Bejan to TEACHER...");
        userService.assignRole("bejan@ankarabilim.edu.tr", Role.TEACHER);

        // 4. Guardrail Test: Retry Access
        // We need to fetch the user again (or rely on reference) to see the update
        System.out.println("[Test] " + currentUser.username + " is trying to open Teacher Dashboard again...");
        
        if (currentUser.role == Role.TEACHER) {
            System.out.println(">> Access Granted: Opening Teacher Dashboard...");
        } else {
            System.out.println(">> Access Denied.");
        }
        
        System.out.println("\n--- System Check Complete ---");
    }
}