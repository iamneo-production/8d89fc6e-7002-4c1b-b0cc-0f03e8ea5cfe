package com.example.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Model.Recharges;
import com.example.backend.Repository.RechargeRepository;

@Service
public class RechargeService{
    @Autowired
    private RechargeRepository rechargeRepo;

    public Recharges AddRecharge(Recharges  recharges) {
    	Recharges save = rechargeRepo.save(recharges);
        return save;
    }

    public List<Recharges> viewRecharge() {
        List<Recharges> findAll = rechargeRepo.findAll();
        return findAll;
    }

    public Optional<Recharges> viewRechargeById(int rechargeId) {
        Optional<Recharges> recharge = rechargeRepo.findById(rechargeId);
        return recharge;
    }
  
    public void deleteRecharge(int rechargeId) {
    	 rechargeRepo.deleteById(rechargeId);
    }
}
