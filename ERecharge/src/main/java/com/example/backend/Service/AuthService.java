//package com.example.backend.Service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.backend.Model.LoginModel;
//import com.example.backend.Model.UserModel;
//import com.example.backend.Model.AdminModel;
//import com.example.backend.Repository.UserRepository;
//import com.example.backend.Repository.AdminRepository;
//
//@Service
//public class AuthService {
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private AdminRepository adminRepository;
//
//    public boolean isUserPresent(LoginModel data) {
//        UserModel user = userRepository.findByEmail(data.getEmail());
//        if (user != null && user.getPassword().equals(data.getPassword())) {
//            return true; // User is present and credentials are correct
//        }
//        return false; // User is not present or credentials are incorrect
//    }
//
//    public boolean isAdminPresent(LoginModel data) {
//        AdminModel admin = adminRepository.findByEmail(data.getEmail());
//        if (admin != null && admin.getPassword().equals(data.getPassword()) && admin.getUserRole().equals("admin")) {
//            System.out.println("Admin Password: " + admin.getPassword());
//            System.out.println("Data Password: " + data.getPassword());
//            System.out.println("Admin Role: " + admin.getUserRole());
//            return true; // Admin is present, credentials are correct, and role is admin
//        }
//        return false; // Admin is not present, credentials are incorrect, or role is not admin
//    }
//
//
//    public void saveUser(UserModel user) {
//        userRepository.save(user);
//    }
//
//    public void saveAdmin(AdminModel admin) {
//        adminRepository.save(admin);
//    }
//
//    public UserModel findByUserEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
//
//    public AdminModel findByAdminEmail(String email) {
//        return adminRepository.findByEmail(email);
//    }
//}














package com.example.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Model.LoginModel;
import com.example.backend.Model.UserModel;
import com.example.backend.Model.AdminAccountRequest;
import com.example.backend.Model.AdminModel;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Repository.AdminAccountRequestRepository;
import com.example.backend.Repository.AdminRepository;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private AdminAccountRequestRepository adminAccountRequestRepository; 

    public boolean isUserPresent(LoginModel data) {
        UserModel user = userRepository.findByEmail(data.getEmail());
        if (user != null && user.getPassword().equals(data.getPassword())) {
            return true; // User is present and credentials are correct
        }
        return false; // User is not present or credentials are incorrect
    }

    public boolean isAdminPresent(LoginModel data) {
        AdminModel admin = adminRepository.findByEmail(data.getEmail());
        if (admin != null && admin.getPassword().equals(data.getPassword()) && admin.getUserRole().equals("admin")) {
            System.out.println("Admin Password: " + admin.getPassword());
            System.out.println("Data Password: " + data.getPassword());
            System.out.println("Admin Role: " + admin.getUserRole());
            return true; 
        }
        return false; 
    }

    public void saveUser(UserModel user) {
        userRepository.save(user);
    }

    public void saveAdmin(AdminModel admin) {
        adminRepository.save(admin);
    }

    public UserModel findByUserEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public AdminModel findByAdminEmail(String email) {
        return adminRepository.findByEmail(email);
    }
    
    
    public void saveAdminAccountRequest(AdminAccountRequest adminAccountRequest) {
        adminAccountRequestRepository.save(adminAccountRequest);
    }
    
    
//    public boolean authorizeAdminRequest(int requestId) {
//    	AdminAccountRequest adminRequest = adminAccountRequestRepository.findById(requestId).orElse(null);
//        if (adminRequest != null) {
//            adminRequest.setUserRole("admin");
//            adminAccountRequestRepository.save(adminRequest);
//            return true; // Admin request authorized successfully
//        }
//        return false; // Admin request not found
//    }
    
    
    
    
    
    
    public boolean authorizeAdminRequest(int requestId) {
        Optional<AdminAccountRequest> optionalRequest = adminAccountRequestRepository.findById(requestId);
        
        if (optionalRequest.isPresent()) {
            AdminAccountRequest request = optionalRequest.get();
            if (request.isAuthorized()) {
                // Request is already authorized, no further action needed
                return false;
            }
            
            // Create a new AdminModel using the data from the request
            AdminModel adminModel = new AdminModel();
            adminModel.setUsername(request.getUsername());
            adminModel.setEmail(request.getEmail());
            adminModel.setMobileNumber(request.getMobileNumber());
            adminModel.setPassword(request.getPassword());
            adminModel.setUserRole("admin"); // Assuming you want to set the role to "admin"
            
            // Save the AdminModel
            adminRepository.save(adminModel);
            
            // Mark the request as authorized
            request.setAuthorized(true);
            adminAccountRequestRepository.save(request);
            
            // Delete the request since it is now authorized
            adminAccountRequestRepository.deleteById(requestId);
            
            return true;
        }
        
        return false;
    }

    public boolean deleteAdminRequest(int requestId) {
    	AdminAccountRequest adminRequest = adminAccountRequestRepository.findById(requestId).orElse(null);
        System.out.println(adminRequest);
        if (adminRequest != null) {
        	adminAccountRequestRepository.delete(adminRequest);
            return true; 
        }
        return false;
    }
    
    public List<AdminAccountRequest> getAllAdminAccountRequests() {
        return adminAccountRequestRepository.findAll();
    }
    
    public AdminAccountRequest getAdminAccountRequestByEmail(String email) {
        return adminAccountRequestRepository.findByEmail(email);
    }
    
    
    
    
    
    
    
}

