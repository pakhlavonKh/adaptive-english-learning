package services;

import infrastructure.ILMSGateway;

public class LMSService {
    private ILMSGateway lmsGateway;
    private boolean isConnected = false;

    public LMSService(ILMSGateway lmsGateway) {
        this.lmsGateway = lmsGateway;
    }

    public boolean configureIntegration(String apiUrl, String apiKey, String courseId) {
        System.out.println("[LMSService] Testing connection credentials...");
        
        boolean success = lmsGateway.verifyConnection(apiUrl, apiKey);
        
        if (success) {
            this.isConnected = true;
            System.out.println("[LMSService] Configuration Saved. Linked to Course ID: " + courseId);
            return true;
        } else {
            System.out.println("[LMSService] Validation failed. Configuration NOT saved.");
            return false;
        }
    }
}