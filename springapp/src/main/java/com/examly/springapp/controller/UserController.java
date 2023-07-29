package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Plans;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.services.UserService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
//@CrossOrigin("http://localhost:3000/")
@CrossOrigin("*")
@RequestMapping("/admin")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<UserModel> addUser(@RequestBody UserModel user) {
        UserModel addedUser = userService.addUser(user);
        return ResponseEntity.ok(addedUser);
    }
    
    @GetMapping("/getAllUsers")
	public ResponseEntity<List<UserModel>> viewUsers() {
	    List<UserModel> viewUsers = userService.viewUsers();
	    if (viewUsers.isEmpty()) {
	        return ResponseEntity.noContent().build(); 
	    } else {
	        return ResponseEntity.ok(viewUsers); 
	    }
	}

    @GetMapping("/getUser/{id}")
    public ResponseEntity<UserModel> getUser(@PathVariable int id) {
        Optional<UserModel> optionalUser = userService.viewUserById(id);
        return optionalUser.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/editUser/{id}")
    public ResponseEntity<UserModel> editUser(@PathVariable int id, @RequestBody UserModel updatedUser) {
        Optional<UserModel> optionalUser = userService.viewUserById(id);
        if (optionalUser.isPresent()) {
            UserModel user = optionalUser.get();
            // Update the user with the new values
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setUsername(updatedUser.getUsername());
            user.setMobileNumber(updatedUser.getMobileNumber());
            user.setUserRole(updatedUser.getUserRole());

            UserModel updated = userService.updateUser(user);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @GetMapping("/id")
    public ResponseEntity<Integer> getUserIdByEmail(@RequestParam String email) {
        UserModel user = userService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user.getId());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
