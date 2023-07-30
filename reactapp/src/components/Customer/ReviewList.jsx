
import React from 'react';
import axios from 'axios';

const ReviewList = ({ reviews, userEmail,handleEditReview }) => {
  

  const handleDeleteReview = (id) => {
    // Send a DELETE request to the server
    axios.delete(`https://8080-bccbfcacfceaaabbdddabaaafdeafcffbbb.project.examly.io/user/deleteReview/${id}`)
      .then((response) => {
        // If the review was deleted successfully, log the message
        console.log(`Successfully deleted review with id: ${id}`);
        // Implement any additional logic here if needed after successful deletion
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
        // Implement any error handling logic here if needed
      });
  };

  return (
    <div className='reviews_section'>
    <h2 className='reviews_head'>Reviews</h2>
         <div className='unorder_list'>
      {reviews.map((review, index) => (
        <div key={index} className='order_list'>
          <p >
            <strong className='review_username'>{review.username}: </strong>
            {review.review}
          </p>
          <p >
          <span className='review_rating'>Rating:</span> {review.rating}</p>
          {userEmail === review.email && (
            <>
            <div  className='edit_delete_btns'>
            <button className='review_edit_btn' onClick={() => handleEditReview(review.id)}>Edit</button>
              <button className='review_delete_btn' onClick={() => handleDeleteReview(review.id)}>Delete</button>
            </div>
              </>
          )}
        </div>
      ))}
    </div>
    </div>
   
  );
};

export default ReviewList;
