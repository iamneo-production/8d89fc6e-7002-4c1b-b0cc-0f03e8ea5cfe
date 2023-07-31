package com.example.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Model.Plans;
import com.example.backend.Repository.PlanRepository;

@Service
public class PlanService {
    @Autowired
    private PlanRepository planRepo;

    public Plans AddPlan(Plans plans) {
        Plans save = planRepo.save(plans);
        return save;
    }

    public List<Plans> viewPlans() {
        List<Plans> findAll = planRepo.findAll();
        return findAll;
    }

    public Optional<Plans> viewPlanById(int planId) {
        Optional<Plans> plan = planRepo.findById(planId);
        return plan;
    }
    public Plans updatePlan(Plans updatedPlan) {
        Plans savedPlan = planRepo.save(updatedPlan);
        return savedPlan;
    }

    public void deletePlan(int planId) {
        planRepo.deleteById(planId);
    }
}
