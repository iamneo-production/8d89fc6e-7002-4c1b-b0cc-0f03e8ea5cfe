package com.example.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.Reviews;

public interface ReviewRepository extends JpaRepository<Reviews, Integer> {
    List<Reviews> findByEmail(String email);
}
