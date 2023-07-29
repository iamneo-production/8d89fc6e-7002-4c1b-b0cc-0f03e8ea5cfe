package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
    UserModel findByEmail(String email);
}

