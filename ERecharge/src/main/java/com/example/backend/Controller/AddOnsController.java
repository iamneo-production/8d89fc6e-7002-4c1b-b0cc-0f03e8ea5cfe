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

import com.example.backend.Model.AddOns;
//import com.example.backend.Model.Plans;
import com.example.backend.Service.AddOnsService;

@RestController
//@CrossOrigin("http://localhost:3000/")
@CrossOrigin("*")
@RequestMapping("/admin")
public class AddOnsController {
	@Autowired
	private AddOnsService addonService;
	
	
//	AddPlan
	@PostMapping("/addAddon")
	@ResponseBody
	public AddOns AddAddOns(@RequestBody AddOns addons ) {
		AddOns AddAddOns= addonService.AddAddOns(addons);
		return AddAddOns;
	}
	
	
//	view/get all AddOns
	@GetMapping("/getAddon")
	public ResponseEntity<List<AddOns>> viewAddOns() {
	    List<AddOns> viewAddOns = addonService.viewAddOns();
	    if (viewAddOns.isEmpty()) {
	        return ResponseEntity.noContent().build(); 
	    } else {
	        return ResponseEntity.ok(viewAddOns); 
	    }
	}
//edit AddonById
	
	@PostMapping("/editAddon/{addOnId}")
    @ResponseBody
    public ResponseEntity<AddOns> updateAddOnById(@PathVariable int addOnId, @RequestBody AddOns updatedPlan) {
        Optional<AddOns> optionalPlan = addonService.viewAddOnById(addOnId);
        if (optionalPlan.isPresent()) {
            AddOns plan = optionalPlan.get();
            plan.setAddonType(updatedPlan.getAddonType());
            plan.setAddonName(updatedPlan.getAddonName());
            plan.setAddonValidity(updatedPlan.getAddonValidity());
            plan.setAddonDetails(updatedPlan.getAddonDetails());
            plan.setAddonPrice(updatedPlan.getAddonPrice());
        

            AddOns updated = addonService.updateAddon(plan);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
//	Delete an AddOn
	@DeleteMapping("/deleteAddon/{addonId}")
	public  void deleteAddOn(@PathVariable int addonId) {
		addonService.deleteAddOns(addonId);
	}
	

	
	
	
}
	