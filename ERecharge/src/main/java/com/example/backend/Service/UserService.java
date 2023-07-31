//package com.example.backend.Service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.backend.Model.UserModel;
//import com.example.backend.Repository.UserRepository;
//
//@Service
//public class UserService {
//    @Autowired
//    private UserRepository userRepository;
//
//    public UserModel addUser(UserModel data) {
//        return userRepository.save(data);
//    }
//
//    public UserModel getUser(int id) {
//        // Logic to get the user by the specified userId
//        return userRepository.findById(id).orElse(null);
//    }
//
//    public void editUser(int id, UserModel data) {
//        // Logic to edit the user with the specified userId
//        UserModel user = userRepository.findById(id).orElse(null);
//        if (user != null) {
//            // Update the user properties with the data provided
//            user.setUsername(data.getUsername());
//            user.setEmail(data.getEmail());
//            user.setPassword(data.getPassword());
//            user.setMobileNumber(data.getMobileNumber());
//            userRepository.save(user);
//        }
//    }
//
//    public void deleteUser(int id) {
//        // Logic to delete the user with the specified userId
//        userRepository.deleteById(id);
//    }
//}
















































package com.example.backend.Service;

import com.example.backend.Model.UserModel;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserModel addUser(UserModel user) {
    	
        return userRepository.save(user);
    }

    public List<UserModel> viewUsers() {
        return userRepository.findAll();
    }

    public Optional<UserModel> viewUserById(int id) {
        return userRepository.findById(id);
    }

    public UserModel updateUser(UserModel user) {
        return userRepository.save(user);
    }

    public boolean deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public UserModel findByEmail(String email) {
    	return userRepository.findByEmail(email);
    }
  



}

