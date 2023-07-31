package com.example.backend.Controller;


import java.util.List;
import org.springframework.http.ResponseEntity;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Model.Plans;
import com.example.backend.Service.PlanService;

@RestController
//@CrossOrigin("http://localhost:3000/")
@CrossOrigin("*")
@RequestMapping("/admin")
public class PlanController {
	@Autowired
	private PlanService planService;
	
	
//	AddPlan
	@PostMapping("/addPlan")
	@ResponseBody
	public Plans AddPlan(@RequestBody Plans plans ) {
		Plans AddPlan= planService.AddPlan(plans);
		return AddPlan;
	}
	
//	GetAllPlans(viewPlans
//	@GetMapping("/getAllPlan")
//	public List<Plans> viewPlans(){
//		List<Plans> viewPlans=planService.viewPlans();
//		return viewPlans;
//	}
//	
	
	
	@GetMapping("/getAllPlan")
	public ResponseEntity<List<Plans>> viewPlans() {
	    List<Plans> viewPlans = planService.viewPlans();
	    if (viewPlans.isEmpty()) {
	        return ResponseEntity.noContent().build(); 
	    } else {
	        return ResponseEntity.ok(viewPlans); 
	    }
	}

	
//	viewPlanById
	// viewPlanById
	@GetMapping("/viewPlanById/{planId}")
	public ResponseEntity<Plans> viewPlanById(@PathVariable int planId) {
	    Optional<Plans> optionalPlan = planService.viewPlanById(planId);
	    
	    if (optionalPlan.isPresent()) {
	        Plans plan = optionalPlan.get();
	        return ResponseEntity.ok(plan);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	
//	editPlan(editPlan by planId)
	// updatePlanById
	@PostMapping("/editPlan/{planId}")
    @ResponseBody
    public ResponseEntity<Plans> updatePlanById(@PathVariable int planId, @RequestBody Plans updatedPlan) {
        Optional<Plans> optionalPlan = planService.viewPlanById(planId);
        if (optionalPlan.isPresent()) {
            Plans plan = optionalPlan.get();
            plan.setPlanType(updatedPlan.getPlanType());
            plan.setPlanName(updatedPlan.getPlanName());
            plan.setPlanValidity(updatedPlan.getPlanValidity());
            plan.setPlanDetails(updatedPlan.getPlanDetails());
            plan.setPlanPrice(updatedPlan.getPlanPrice());
            plan.setPlanOffers(updatedPlan.getPlanOffers());

            Plans updated = planService.updatePlan(plan);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
	
//	deletePlans(deletePlan by planId)
	@DeleteMapping("/deletePlan/{planId}")
	public  void deletePlan(@PathVariable int planId) {
	    planService.deletePlan(planId);
	}
}

