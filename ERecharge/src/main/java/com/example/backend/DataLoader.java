package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.Model.AdminModel;
import com.example.backend.Model.UserModel;
import com.example.backend.Repository.AdminRepository;
import com.example.backend.Repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

	@Autowired
    private AdminRepository adminRepository;
	@Autowired
	private UserRepository userRepository;

//    @Autowired
//    public DataLoader(AdminRepository adminRepository) {
//        this.adminRepository = adminRepository;
//    }
//    
//    @Autowired
//    public DataLoader(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }

    @Override
    public void run(String... args) throws Exception {
        // Create an AdminModel object with default data
        AdminModel admin = new AdminModel();
        admin.setUsername("admin");
        admin.setEmail("admin@gmail.com");
        admin.setPassword("Admin@321");
        admin.setMobileNumber("9876543210");
        admin.setUserRole("admin");

        // Save the AdminModel object to the database
        adminRepository.save(admin);
        
        
        UserModel user = new UserModel();
        user.setUsername("admin");
        user.setEmail("admin@gmail.com");
        user.setPassword("Admin@321");
        user.setMobileNumber("9876543210");
        user.setUserRole("admin");


        // Save the UserModel object to the database
        userRepository.save(user);
        
    }
}
