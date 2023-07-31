//
//package com.example.backend.Controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.backend.Model.AdminModel;
//import com.example.backend.Model.LoginModel;
//import com.example.backend.Model.UserModel;
//import com.example.backend.Service.AuthService;
//
//@RestController
//@CrossOrigin("http://localhost:3000/")
//@RequestMapping("/auth")
//public class AuthController {
//    @Autowired
//    private AuthService authService;
//
//    @PostMapping("/user/login")
//    public boolean isUserPresent(@RequestBody LoginModel data) {
//        return authService.isUserPresent(data);
//    }
//
//    @PostMapping("/admin/login")
//    public boolean isAdminPresent(@RequestBody LoginModel data) {
//        return authService.isAdminPresent(data);
//    }
//
//    @PostMapping("/user/signup")
//    public void saveUser(@RequestBody UserModel user) {
//        authService.saveUser(user);
//    }
//
//    @PostMapping("/admin/signup")
//    public void saveAdmin(@RequestBody AdminModel user) {
//        authService.saveAdmin(user);
//    }
//}












package com.example.backend.Controller;

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

import com.example.backend.Model.AdminAccountRequest;
import com.example.backend.Model.AdminModel;
import com.example.backend.Model.LoginModel;
import com.example.backend.Model.UserModel;
import com.example.backend.Repository.AdminAccountRequestRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Service.AuthService;

@RestController
//@CrossOrigin("http://localhost:3000/")
@CrossOrigin("*")
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

//    @PostMapping("/admin/signup")
//    public void saveAdmin(@RequestBody AdminModel user) {
//        authService.saveAdmin(user);
//    }
    
    
//    @PostMapping("/admin/signup")
//    public void saveAdminAccountRequest(@RequestBody AdminAccountRequest adminAccountRequest) {
//        adminAccountRequest.setAuthorized(false); // Set default value for authorized field
//        authService.saveAdminAccountRequest(adminAccountRequest);
//    }

//    @PostMapping("/admin/signup")
//    public void saveAdminAccountRequest(@RequestBody AdminAccountRequest adminAccountRequest) {
//        // Map data from AdminAccountRequest to UserModel
//        UserModel user = new UserModel();
//        user.setUsername(adminAccountRequest.getUsername());
//        user.setEmail(adminAccountRequest.getEmail());
//        user.setMobileNumber(adminAccountRequest.getMobileNumber());
//        user.setPassword(adminAccountRequest.getPassword());
//        user.setUserRole("user");
//        // Save the user to the userRepository
//        userRepository.save(user);
//
//        // Save the admin account request
//        adminAccountRequest.setAuthorized(false); // Set default value for authorized field
//        adminAccountRequest.setUserRole("admin"); // Set the role to "admin" for the admin request
//        adminAccountRequest.setId(user.getId()); // Set the userId for the admin request
//        adminAccountRequestRepository.save(adminAccountRequest);
//    }
//    
    
    
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
