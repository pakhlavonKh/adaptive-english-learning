package infrastructure;

import models.Student;
import java.util.ArrayList;
import java.util.List;

public class Database {
    // This List acts as your "RAM Memory" Database
    private List<Student> users = new ArrayList<>();

    public boolean emailExists(String email) {
        for (Student s : users) {
            if (s.email.equalsIgnoreCase(email)) {
                return true; 
            }
        }
        return false; 
    }

    public void saveUser(Student student) {
        users.add(student); // Saves to our List
        System.out.println("[Database] User saved to Remote DB: " + student.username);
    }

    public Student findUserByEmail(String email) {
        for (Student s : users) {
            if (s.email.equalsIgnoreCase(email)) {
                return s;
            }
        }
        return null;
    }

    public void updateUserStatus(String studentId, String status) {
        System.out.println("[Database] Updating status for " + studentId + " to " + status);
    }

    public void saveProficiencyProfile(String studentId, String scores) {
        System.out.println("[Database] Persisting proficiency scores for " + studentId);
    }
}