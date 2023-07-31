package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.AdminAccountRequest;

public interface  AdminAccountRequestRepository extends JpaRepository<AdminAccountRequest,Integer> {
	  AdminAccountRequest findByEmail(String email);

}
