package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.Model.Reviews;
import com.example.backend.Service.ReviewService;

@RestController
//@CrossOrigin("http://localhost:3000/")
@CrossOrigin("*")
@RequestMapping("/user")
public class ReviewController {
	@Autowired
    private  ReviewService reviewService;


	 @PostMapping("/addReview")
    public ResponseEntity<Reviews> saveReview(@RequestBody Reviews review) {
        Reviews savedReview = reviewService.saveReview(review);
        return ResponseEntity.ok(savedReview);
    }

	 @GetMapping("/reviewByEmail")
	 public ResponseEntity<List<Reviews>> getReviewsByEmail(@RequestParam String email) {
	     List<Reviews> reviews = reviewService.findByEmail(email);
	     if (!reviews.isEmpty()) {
	         return new ResponseEntity<>(reviews, HttpStatus.OK);
	     } else {
	         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	     }
	 }
	 
	 
	 @GetMapping("/getReview")
	    public ResponseEntity<List<Reviews>> getAllReviews() {
	        List<Reviews> reviews = reviewService.getAllReviews();
	        if (!reviews.isEmpty()) {
	            return new ResponseEntity<>(reviews, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }


    // Add other API endpoints for review management if needed
	 
	 
	 
	 @DeleteMapping("/deleteReview/{id}")
	    public ResponseEntity<Void> deleteReview(@PathVariable int id) {
	        if (reviewService.deleteReview(id)) {
	            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	 
	 
	 @PutMapping("/editReview/{id}")
	    public ResponseEntity<Reviews> updateReview(@PathVariable int id, @RequestBody Reviews updatedReview) {
	        Reviews review = reviewService.updateReview(id, updatedReview);
	        if (review != null) {
	            return ResponseEntity.ok(review);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }	 
}
