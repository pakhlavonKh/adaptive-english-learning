import controllers.LMSController;
import services.LMSService;
import infrastructure.CanvasGateway;
import models.Student;
import models.Role;

public class LMSMain {
    public static void main(String[] args) {
        System.out.println("--- Starting LMS Subsystem Test ---");

        // 1. Setup ONLY the LMS components
        // We don't need Database or EmailSystem here!
        CanvasGateway canvasGateway = new CanvasGateway();
        LMSService lmsService = new LMSService(canvasGateway);
        LMSController lmsController = new LMSController(lmsService);

        // 2. Create Mock Users manually (No need for UserService)
        // Teacher
        Student teacher = new Student("Mrs. Smith", "teacher@school.edu", "pass");
        teacher.role = Role.TEACHER; // Manually assign role

        // Admin
        Student admin = new Student("SysAdmin", "admin@school.edu", "pass");
        admin.role = Role.ADMIN; // Manually assign role


        // ==========================================
        // TEST SCENARIO: LMS Integration (UC12)
        // ==========================================
        
        // Test A: Teacher tries to configure (Should FAIL)
        System.out.println("\n[Test] Teacher attempting to configure LMS...");
        lmsController.connectToCanvas(teacher, "https://canvas.instructure.com", "sk_live_123", "COURSE_101");

        // Test B: Admin tries with WRONG key (Should FAIL)
        System.out.println("\n[Test] Admin attempting with INVALID key...");
        lmsController.connectToCanvas(admin, "https://canvas.instructure.com", "wrong_key", "COURSE_101");

        // Test C: Admin tries with CORRECT key (Should SUCCESS)
        // (Remember: CanvasGateway only accepts keys starting with "sk_live" and containing "instructure")
        System.out.println("\n[Test] Admin attempting with VALID key...");
        lmsController.connectToCanvas(admin, "https://canvas.instructure.com", "sk_live_SECRET", "COURSE_101");

        System.out.println("\n--- LMS Test Complete ---");
    }
}