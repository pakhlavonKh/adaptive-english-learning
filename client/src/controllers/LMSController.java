package controllers;

import services.LMSService;
import models.Student;
import models.Role;

public class LMSController {
    private LMSService lmsService;

    public LMSController(LMSService lmsService) {
        this.lmsService = lmsService;
    }

    public void connectToCanvas(Student currentUser, String apiUrl, String apiKey, String courseId) {
        System.out.println("\n--- Request: Configure LMS Integration ---");

        // 1. RBAC Guardrail (Critical!)
        if (currentUser.role != Role.ADMIN) {
            System.out.println(">> Access Denied: Only ADMINS can configure LMS settings.");
            return;
        }

        // 2. Proceed if Admin
        System.out.println(">> Access Granted. Initiating Handshake...");
        boolean result = lmsService.configureIntegration(apiUrl, apiKey, courseId);
        
        if (result) {
            System.out.println("Response: Success! LMS is now connected.");
        } else {
            System.out.println("Response: Error. Please check your API Key or URL.");
        }
    }
}