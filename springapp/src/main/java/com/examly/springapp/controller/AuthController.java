package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.AdminAccountRequest;
import com.examly.springapp.model.AdminModel;
import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.AdminAccountRequestRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.AuthService;

@RestController
//@CrossOrigin("http://localhost:3000/")
@CrossOrigin("*")
// @CrossOrigin("https://8080-bccbfcacfceaaabbdddabaaafdeafcffbbb.project.examly.io/")
@RequestMapping("/auth")
public class AuthController {
	
    @Autowired
    private AuthService authService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdminAccountRequestRepository adminAccountRequestRepository; 


    @PostMapping("/user/login")
    public boolean isUserPresent(@RequestBody LoginModel data) {
        return authService.isUserPresent(data);
    }

    @PostMapping("/admin/login")
    public boolean isAdminPresent(@RequestBody LoginModel data) {
        return authService.isAdminPresent(data);
    }

    @PostMapping("/user/signup")
    public void saveUser(@RequestBody UserModel user) {
        authService.saveUser(user);
    }

    
    @PostMapping("/admin/signup")
    public ResponseEntity<String> saveAdminAccountRequest(@RequestBody AdminAccountRequest adminAccountRequest) {
        
    	// Check if an AdminAccountRequest already exists with the given email
        AdminAccountRequest existingRequest = authService.getAdminAccountRequestByEmail(adminAccountRequest.getEmail());
        if (existingRequest != null) {
            // Request with the given email already exists
            if (existingRequest.isAuthorized()) {
                return ResponseEntity.badRequest().body("An admin account with this email already exists.");
            } else {
                return ResponseEntity.badRequest().body("An admin account request with this email is already pending.");
            }
        }

        // If a request does not exist, proceed to save the new request
        adminAccountRequest.setAuthorized(false); // Set default value for authorized field
        authService.saveAdminAccountRequest(adminAccountRequest);
        return ResponseEntity.ok("Your request to access the admin side has been sent.");
    }

    
    
    @PostMapping("/admin/authorizeRequest/{requestId}")
    public boolean authorizeAdminRequest(@PathVariable int requestId) {
        return authService.authorizeAdminRequest(requestId);
    }

    @DeleteMapping("/admin/deleteRequest/{requestId}")
    public boolean deleteAdminRequest(@PathVariable int requestId) {
        return authService.deleteAdminRequest(requestId);
    }
    
    
    
    @GetMapping("/admin/viewRequests")
    public ResponseEntity<List<AdminAccountRequest>> viewAdminAccountRequests() {
        List<AdminAccountRequest> adminRequests = authService.getAllAdminAccountRequests();
        if (adminRequests.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(adminRequests);
        }
    }
}
