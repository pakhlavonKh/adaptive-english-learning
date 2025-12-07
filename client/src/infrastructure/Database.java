package infrastructure;

import models.Student;

public class Database {
    // In the future, you will add: private Connection connection; here

    public boolean emailExists(String email) {
        // TODO: Replace with "SELECT count(*) FROM users WHERE email = ?"
        return false; 
    }

    public void saveUser(Student student) {
        // TODO: Replace with "INSERT INTO users (username, email...) VALUES (...)"
        System.out.println("[Database] Saving user to Remote DB: " + student.username);
    }

    public void updateUserStatus(String studentId, String status) {
        // TODO: Replace with "UPDATE users SET status = ? WHERE id = ?"
        System.out.println("[Database] Updating status for " + studentId + " to " + status);
    }

    public void saveProficiencyProfile(String studentId, String scores) {
        // TODO: Replace with SQL Update
        System.out.println("[Database] Persisting proficiency scores for " + studentId);
    }
}