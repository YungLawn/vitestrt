import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <button
          
          >
            *
          </button>

        );
      })}
    </div>
  );
};

export default StarRating;
