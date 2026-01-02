package models;

public class Student {
    public String studentId;
    public String username;
    public String email;
    public String password; // Can be null for Google users
    public String status; 
    public String proficiencyProfile;
    public Role role;
    public String authProvider; // NEW: "LOCAL" or "GOOGLE"

    public Student(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.status = "PENDING";
        this.role = Role.STUDENT;
        this.authProvider = "LOCAL"; // Default
    }
}