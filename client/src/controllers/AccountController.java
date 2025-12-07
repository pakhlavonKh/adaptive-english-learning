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
}