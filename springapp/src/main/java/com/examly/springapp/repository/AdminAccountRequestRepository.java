package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.AdminAccountRequest;

public interface  AdminAccountRequestRepository extends JpaRepository<AdminAccountRequest,Integer> {
	  AdminAccountRequest findByEmail(String email);

}
