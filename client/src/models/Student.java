package models;

public class Student {
    public String studentId;
    public String username;
    public String email;
    public String password;
    public String status; 
    public String proficiencyProfile;
    
    // NEW: Role-Based Access Control
    public Role role; 

    public Student(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.status = "PENDING";
        this.role = Role.STUDENT; // Default role is always Student
    }
}