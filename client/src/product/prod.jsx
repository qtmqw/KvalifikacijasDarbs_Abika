import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const RatingPage = () => {
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/rating/rating`, {
        value: rating,
        user: '6468ab7c5f8239b55f5a95f0',
        product: '6465e9dc5deccd380c508fbc',
      });

      console.log(response.data);
      setRating(0);
      setErrorMessage('');
      fetchAverageRating('6465e9dc5deccd380c508fbc');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Failed to submit rating');
      }
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/rating/ratings');
      setRatings(response.data.ratings);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAverageRating = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8080/rating/rating/${productId}`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRatings();
    fetchAverageRating('6465e9dc5deccd380c508fbc');
  }, []);

  const renderStars = (value) => {
    const starCount = 5;
    const filledStars = Math.floor(value);
    const hasHalfStar = value - filledStars >= 0.5;

    const stars = [];

    for (let i = 1; i <= starCount; i++) {
      if (i <= filledStars) {
        stars.push(<span key={i} style={{ color: 'gold' }}>&#9733;</span>);
      } else if (i === filledStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} style={{ color: 'gold' }}>
            &#9733;
          </span>
        );
      } else {
        stars.push(<span key={i} style={{ color: 'gray' }}>&#9733;</span>);
      }
    }

    return stars;
  };

  return (
    <Container>
      <h2>Rate the Product</h2>
      {errorMessage}
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value)}
            style={{
              cursor: 'pointer',
              color: rating >= value ? 'gold' : 'gray',
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
      <button onClick={handleRatingSubmit}>Submit Rating</button>

      <h2>All Ratings</h2>
      <ul>
        {ratings.map((rating) => (
          <li key={rating._id}>
            User: {rating.user}, Product: {rating.product}, Value: {rating.value}
          </li>
        ))}
      </ul>

      <h2>Average Rating</h2>
      <div className='flex'>
        <div className='text-2xl'>{renderStars(averageRating)}</div><div className='my-auto ml-3'>{averageRating} out of 5</div> 
      </div>

    </Container>
  );
};

export default RatingPage;
