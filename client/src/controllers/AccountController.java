package controllers;

import services.UserService;

public class AccountController {
    private UserService userService;

    public AccountController(UserService userService) {
        this.userService = userService;
    }

    public void register(String username, String email, String password) {
        boolean result = userService.registerUser(username, email, password);
        if (result) {
            System.out.println("Response: Check your email.");
        } else {
            System.out.println("Response: Registration failed.");
        }
    }

    public void verifyEmail(String token) {
        boolean result = userService.activateAccount(token);
        if (result) {
            System.out.println("Response: Account Activated & Data Synced.");
        } else {
            System.out.println("Response: Invalid Token.");
        }
    }
    // ... existing code ...
    
    public void loginWithGoogle(String token) {
        System.out.println("--- OAuth Request Received ---");
        models.Student user = userService.loginWithOAuth(token);
        
        if (user != null) {
            System.out.println("Response: Login Successful via Google.");
            System.out.println("Token Generated: JWT-ACCESS-TOKEN-FOR-" + user.username);
        } else {
            System.out.println("Response: OAuth Login Failed.");
        }
    }
}