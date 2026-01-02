package infrastructure;

public interface ILMSGateway {
    // Returns true if the external LMS accepts our credentials
    boolean verifyConnection(String apiUrl, String apiKey);
}