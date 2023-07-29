import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewList from './ReviewList';
import './reviewPage.css';
import NavigationBar from './Navigationbar';

const ReviewPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    loadReviews();
  }, []);

  const loadUserData = () => {
    const storedCredentials = localStorage.getItem('credentials');
    if (storedCredentials) {
      const loggedUserData = JSON.parse(storedCredentials);
      setUserName(loggedUserData.username || '');
      setEmail(loggedUserData.email);
      setUserRole(loggedUserData.userRole);
    }
  };

  const loadReviews = () => {
    axios
      .get('http://localhost:8080/user/getReview')
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      });
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const addOrUpdateReview = () => {
    if (newReview.trim() === '' || rating === 0) {
      alert('Please fill in the review and rating before adding or updating.');
      return;
    }

    const review = {
      email: email,
      username: userName,
      review: newReview,
      rating: rating,
    };

    if (editReviewId) {
      axios
        .put(`http://localhost:8080/user/editReview/${editReviewId}`, review)
        .then((response) => {
          const updatedReviews = reviews.map((review) =>
            review.id === editReviewId ? response.data : review
          );
          setReviews(updatedReviews);
          setNewReview('');
          setRating(0);
          setEditReviewId(null); // Reset editReviewId after successful update
        })
        .catch((error) => {
          console.error('Error updating review:', error);
        });
    } else {
      axios
        .post('http://localhost:8080/user/addReview', review)
        .then((response) => {
          setReviews([...reviews, response.data]);
          setNewReview('');
          setRating(0);
        })
        .catch((error) => {
          console.error('Error adding review:', error);
        });
    }
  };

  const handleEditReview = (id) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const reviewToEdit = reviews.find((review) => review.id === id);
    setNewReview(reviewToEdit.review);
    setRating(reviewToEdit.rating);
    setEditReviewId(id);
  };

  const handleDeleteReview = (id) => {
    axios
      .delete(`http://localhost:8080/reviews/deleteById/${id}`)
      .then((response) => {
        const updatedReviews = reviews.filter((review) => review.id !== id);
        setReviews(updatedReviews);
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userRole === 'user' || userRole === 'admin') {
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div style={{ paddingTop: "100px" }}>
        <div className='review_body'>
        <div className='first_section'>
          <h1 className='heading_review'>NETFI PORTAL REVIEWS</h1>
          <input
            className='input_fields_username'
            type='text'
            value={userName}
            placeholder='Your Name'
            readOnly
          />
          <br />
          <br />
          <textarea
            className='review_textarea'
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder='Write your review here'
          />
          <br />
          <br />
          <div className='rating_div'>
            <h2>Rating</h2>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => handleRating(value)}
                style={{
                  cursor: 'pointer',
                  color: value <= rating ? 'gold' : 'gray',
                  fontSize: '30px',
                  marginRight: '5px',
                }}
              >
                &#9733;
              </span>
            ))}
            <br />
            <br />
            <button className='add_update_btn' onClick={addOrUpdateReview}>
              {editReviewId ? 'Update Review' : 'Add Review'}
            </button>
            <br />
            <br />
          </div>
          <br />
        </div>
        <div>
          {reviews.length === 0 ? (
            <div className='no_reviews_message'>No reviews Found.Add Your Review</div>
          ) : (
            <ReviewList
              reviews={reviews}
              userEmail={email}
              handleEditReview={handleEditReview}
              handleDeleteReview={handleDeleteReview}
            />
          )}
        </div>
      </div>
        </div>
      </div>
      
    );
  } else {
    navigate('/login');
    return null;
  }
};

export default ReviewPage;
