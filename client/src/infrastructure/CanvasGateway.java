package infrastructure;

public class CanvasGateway implements ILMSGateway {
    public boolean verifyConnection(String apiUrl, String apiKey) {
        System.out.println("[CanvasGateway] Connecting to: " + apiUrl);
        
        // Mock Validation: Let's pretend keys starting with "sk_live" are valid
        if (apiKey.startsWith("sk_live") && apiUrl.contains("instructure.com")) {
            System.out.println("[CanvasGateway] Connection Successful (200 OK).");
            return true;
        } else {
            System.out.println("[CanvasGateway] Connection Failed: 401 Unauthorized.");
            return false;
        }
    }
}