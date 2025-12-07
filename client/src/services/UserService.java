package services;

import infrastructure.Database;
import infrastructure.EmailSystem;
import infrastructure.IExternalDataGateway;
import models.Student;
import java.util.UUID;

public class UserService {
    private Database db;
    private EmailSystem emailSystem;
    private IExternalDataGateway externalGateway;

    // Constructor Injection: This allows you to pass the Real DB or a Test DB easily
    public UserService(Database db, EmailSystem emailSystem, IExternalDataGateway gateway) {
        this.db = db;
        this.emailSystem = emailSystem;
        this.externalGateway = gateway;
    }

    // UC1: Registration Logic
    public boolean registerUser(String username, String email, String password) {
        if (db.emailExists(email)) {
            System.out.println("Error: Account already exists."); 
            return false;
        }

        Student newStudent = new Student(username, email, password);
        newStudent.studentId = UUID.randomUUID().toString(); 
        
        db.saveUser(newStudent); // Saves to the "Remote DB" (via Infrastructure class)

        String token = UUID.randomUUID().toString();
        emailSystem.sendVerification(email, token);
        
        return true;
    }

    // UC1: Verification & Data Sync
    public boolean activateAccount(String token) {
        boolean tokenValid = true; // Logic to check token validity would go here

        if (tokenValid) {
            String userId = "mock-student-id"; // In real app, extract ID from token
            db.updateUserStatus(userId, "ACTIVE");

            // Sync legacy scores immediately upon activation
            String scores = externalGateway.fetchStudentScores(userId);
            db.saveProficiencyProfile(userId, scores);
            
            return true;
        }
        return false;
    }

    // Logic from UC3: Receive Personalized Learning Path [cite: 102]
    public boolean checkProficiencyData(String studentId) {
        System.out.println("[UserService] Checking proficiency profile for: " + studentId);
        
        // 1. Check if we already have the profile locally
        // (In a real app, this would query the DB for the profile string)
        String existingProfile = null; // Simulating "Data Missing" 

        // 2. The "alt" block from Figure 3 
        if (existingProfile == null) {
            System.out.println("[Logic] Proficiency Data Missing. Fetching from External Gateway...");
            
            // Call the External Gateway
            String scores = externalGateway.fetchStudentScores(studentId);
            
            if (scores != null) {
                // Save it to our database
                db.saveProficiencyProfile(studentId, scores);
                return true; // Data Valid & Acquired [cite: 123]
            } else {
                System.out.println("[Error] Data Sync Failed."); // [cite: 115]
                return false;
            }
        } else {
            System.out.println("[Logic] Proficiency Data found locally.");
            return true;
        }
    }
}