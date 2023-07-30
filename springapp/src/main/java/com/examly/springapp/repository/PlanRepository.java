package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.Plans;

public interface  PlanRepository extends JpaRepository<Plans,Integer> {

}
