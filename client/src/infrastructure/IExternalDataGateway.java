package infrastructure;

public interface IExternalDataGateway {
    String fetchStudentScores(String studentId);
}