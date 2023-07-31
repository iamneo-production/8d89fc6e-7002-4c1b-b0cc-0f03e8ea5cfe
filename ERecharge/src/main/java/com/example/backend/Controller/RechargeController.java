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

import com.example.backend.Model.Recharges;
import com.example.backend.Service.RechargeService;

@RestController
//@CrossOrigin("http://localhost:3000/")
@CrossOrigin("*")
@RequestMapping("/user")
public class RechargeController {
	@Autowired
	private RechargeService rechargeService;
	
	
//	AddPlan
	@PostMapping("/addRecharge")
	@ResponseBody
	public Recharges addRecharges(@RequestBody Recharges plans ) {
		Recharges AddPlan= rechargeService.AddRecharge(plans);
		return AddPlan;
	}
	
//	GetAllPlans(viewPlans
//	@GetMapping("/getAllPlan")
//	public List<Plans> viewPlans(){
//		List<Plans> viewPlans=planService.viewPlans();
//		return viewPlans;
//	}
//	
	
	
	@GetMapping("/getRecharge")
	public ResponseEntity<List<Recharges>> viewPlans() {
	    List<Recharges> viewRecharges = rechargeService.viewRecharge();
	    if (viewRecharges.isEmpty()) {
	        return ResponseEntity.noContent().build(); 
	    } else {
	        return ResponseEntity.ok(viewRecharges); 
	    }
	}

	
//	viewPlanById
	// viewPlanById
	@GetMapping("/viewPlanById/{planId}")
	public ResponseEntity<Recharges> viewRechargeById(@PathVariable int rechargeId) {
	    Optional<Recharges> optionalPlan = rechargeService.viewRechargeById(rechargeId);
	    
	    if (optionalPlan.isPresent()) {
	    	Recharges recharge = optionalPlan.get();
	        return ResponseEntity.ok(recharge);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}


	
	
//	deletePlans(deletePlan by planId)
	@DeleteMapping("/deletePlan/{planId}")
	public  void deleteRecharge(@PathVariable int rechargeId) {
		rechargeService.deleteRecharge(rechargeId);
	}
}

