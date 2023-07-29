package com.examly.springapp.service;

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

