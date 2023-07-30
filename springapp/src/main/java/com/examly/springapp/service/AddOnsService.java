package com.example.backend.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.Model.AddOns;
import com.example.backend.Repository.AddOnsRepository;

@Service
public class AddOnsService {
    @Autowired
    private AddOnsRepository addOnsRepo;

    
//    Adding AddOns
    public AddOns AddAddOns(AddOns addons) {
    	AddOns save = addOnsRepo.save(addons);
        return save;
    }
    
    
    
//    Viewing/Getting AddOns
    public List<AddOns> viewAddOns() {
        List<AddOns> findAll = addOnsRepo.findAll();
        return findAll;
    }
    
//    Deleteing AddOns
    public void deleteAddOns(int addonId) {
        addOnsRepo.deleteById(addonId);
    }



	public Optional<AddOns> viewAddOnById(int addOnId) {
		  Optional<AddOns> plan = addOnsRepo.findById(addOnId);
	        return plan;
	}



	public AddOns updateAddon(AddOns plan) {
		AddOns savedPlan = addOnsRepo.save(plan);
	        return savedPlan;
	}



	


    
    
    
    
    
 }
