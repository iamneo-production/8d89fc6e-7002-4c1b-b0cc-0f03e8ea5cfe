package com.example.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.Model.Reviews;
import com.example.backend.Repository.PlanRepository;
import com.example.backend.Repository.ReviewRepository;


@Service
public class ReviewService {


    
    @Autowired
    private ReviewRepository reviewRepository;
    

    public Reviews saveReview(Reviews review) {
        return reviewRepository.save(review);
    }

    public List<Reviews> findByEmail(String email) {
        return reviewRepository.findByEmail(email);
    }
    
    public List<Reviews> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Add other methods related to review management if needed
    
    public boolean deleteReview(int id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    
    
    
    
    
    public Reviews updateReview(int id, Reviews updatedReview) {
        Reviews review = reviewRepository.findById(id).orElse(null);
        if (review != null) {
            review.setUsername(updatedReview.getUsername());
            review.setReview(updatedReview.getReview());
            review.setRating(updatedReview.getRating());
            return reviewRepository.save(review);
        }
        return null;
    }
}
