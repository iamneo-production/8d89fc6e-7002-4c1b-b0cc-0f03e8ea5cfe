package com.examly.springapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.examly.springapp.repository.AdminRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.model.AdminModel;
import com.examly.springapp.model.UserModel;

@Component
public class DataCleanup implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    @Autowired
    public DataCleanup(AdminRepository adminRepository, UserRepository userRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Find and delete the default admin entry from the admin table
        AdminModel defaultAdmin = adminRepository.findByEmail("admin@gmail.com");
        if (defaultAdmin != null) {
            adminRepository.delete(defaultAdmin);
        }

        // Find and delete the default user entry from the user table
        UserModel defaultUser = userRepository.findByEmail("admin@gmail.com");
        if (defaultUser != null) {
            userRepository.delete(defaultUser);
        }
    }
}
