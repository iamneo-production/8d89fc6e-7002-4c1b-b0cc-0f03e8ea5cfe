package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.Recharges;

public interface RechargeRepository  extends JpaRepository<Recharges,Integer> {

}
