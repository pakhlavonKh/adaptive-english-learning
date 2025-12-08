package models;

public class Student {
    public String studentId;
    public String username;
    public String email;
    public String password;
    public String status; // "PENDING" or "ACTIVE"
    public String proficiencyProfile; 

    public Student(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.status = "PENDING"; 
    }
}