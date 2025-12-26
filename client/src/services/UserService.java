package services;

import infrastructure.Database;
import infrastructure.EmailSystem;
import infrastructure.IExternalDataGateway;
import models.Student;
import models.Role; // <--- This was missing!
import java.util.UUID;

import infrastructure.IOAuthProvider;

public class UserService {
    private Database db;
    private EmailSystem emailSystem;
    private IExternalDataGateway externalGateway;

    private IOAuthProvider authProvider; //

    // Update Constructor to accept the new Auth Provider
        public UserService(Database db, EmailSystem emailSystem, IExternalDataGateway gateway, IOAuthProvider authProvider) {
            this.db = db;
            this.emailSystem = emailSystem;
            this.externalGateway = gateway;
            this.authProvider = authProvider;
        }
        // NEW: UC2 - Authenticate via OAuth
        public Student loginWithOAuth(String token) {
            // 1. Verify token with Google (Infrastructure)
            String email = authProvider.verifyTokenAndGetEmail(token);
            
            if (email == null) {
                System.out.println("[OAuth] Authentication failed: Invalid Token.");
                return null;
            }

            // 2. Check if user exists (Auto-Registration Logic)
            Student existingUser = db.findUserByEmail(email);

            if (existingUser != null) {
                System.out.println("[OAuth] User found. Logging in: " + existingUser.username);
                return existingUser;
            } else {
                // 3. User is new -> Auto-Register
                System.out.println("[OAuth] New user detected. Creating account automatically...");
                
                // Create user with no password (null) and "GOOGLE" provider
                Student newUser = new Student("Google User", email, null);
                newUser.studentId = UUID.randomUUID().toString();
                newUser.status = "ACTIVE"; // Google emails are already verified
                newUser.authProvider = "GOOGLE";
                
                // Save to DB
                db.saveUser(newUser);
                
                // Sync Data immediately (FR1 Requirement)
                String scores = externalGateway.fetchStudentScores(newUser.studentId);
                db.saveProficiencyProfile(newUser.studentId, scores);

                return newUser;
            }
        }

    public boolean registerUser(String username, String email, String password) {
        if (db.emailExists(email)) {
            System.out.println("Error: Account already exists."); 
            return false;
        }

        Student newStudent = new Student(username, email, password);
        newStudent.studentId = UUID.randomUUID().toString(); 
        
        db.saveUser(newStudent);

        String token = UUID.randomUUID().toString();
        emailSystem.sendVerification(email, token);
        
        return true;
    }

    public boolean activateAccount(String token) {
        boolean tokenValid = true; 

        if (tokenValid) {
            String userId = "mock-student-id"; 
            db.updateUserStatus(userId, "ACTIVE");

            String scores = externalGateway.fetchStudentScores(userId);
            db.saveProficiencyProfile(userId, scores);
            
            return true;
        }
        return false;
    }

    public boolean checkProficiencyData(String studentId) {
        System.out.println("[UserService] Checking proficiency profile for: " + studentId);
        String existingProfile = null; 

        if (existingProfile == null) {
            System.out.println("[Logic] Proficiency Data Missing. Fetching from External Gateway...");
            String scores = externalGateway.fetchStudentScores(studentId);
            
            if (scores != null) {
                db.saveProficiencyProfile(studentId, scores);
                return true; 
            } else {
                System.out.println("[Error] Data Sync Failed."); 
                return false;
            }
        } else {
            System.out.println("[Logic] Proficiency Data found locally.");
            return true;
        }
    }

    // New Feature: Login (FR2)
    public Student login(String email, String password) {
        return db.findUserByEmail(email); 
    }

    // New Feature: Manage Roles (FR3)
    public void assignRole(String email, Role newRole) {
        Student user = db.findUserByEmail(email);
        if (user != null) {
            user.role = newRole;
            System.out.println("[RBAC] User " + user.username + " promoted to " + newRole);
        } else {
            System.out.println("[RBAC] Error: User not found.");
        }
    }
}