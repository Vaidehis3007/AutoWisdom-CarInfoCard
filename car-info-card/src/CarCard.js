import React, { useState } from 'react';
import './CarCard.css';

const CarCard = ({ 
  imageUrl, 
  name, 
  price, 
  discountedPrice, 
  rating, 
  availability 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate discount percentage
  const discountPercent = discountedPrice 
    ? Math.round(((price - discountedPrice) / price) * 100) 
    : null;

  // Generate rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className={`car-card ${isModalOpen ? 'modal-open' : ''}`}>

      {/* Discount Badge */}
      {discountPercent && (
        <div className="discount-badge">
          {discountPercent}% OFF
        </div>
      )}
      
      {/* Favorite Button */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
      >
        ♥
      </button>

      <div className="card-image">
        <img src={imageUrl} alt={name} />
      </div>

      <div className="card-content">
        <div className="card-header">
          <div>
            <h3>{name}</h3>
            <span className={`availability ${availability.toLowerCase().replace(' ', '-')}`}>
              {availability}
            </span>
          </div>
          <div className="price">
            {discountedPrice ? (
              <>
                <p className="discounted">${discountedPrice.toLocaleString()}</p>
                <p className="original">${price.toLocaleString()}</p>
              </>
            ) : (
              <p>${price.toLocaleString()}</p>
            )}
          </div>
        </div>

        <div className="rating">
          {renderStars(rating)}
          <span className="rating-number">({rating})</span>
        </div>
      </div>

      <div className="card-footer">
      <button 
          className="details-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            setIsModalOpen(true);
          }}
        >
          View Price Details
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay"
        onClick={(e) => {
          e.stopPropagation(); 
          setIsModalOpen(false);
        }}
        >
          <div className="modal"
          onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Price Breakdown - {name}</h2>
              <button 
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="price-row">
                <span>Base Price:</span>
                <span>${price.toLocaleString()}</span>
              </div>
              {discountedPrice && (
                <div className="price-row discount">
                  <span>Discount:</span>
                  <span>-${(price - discountedPrice).toLocaleString()}</span>
                </div>
              )}
              <div className="price-row">
                <span>Estimated Tax:</span>
                <span>${Math.round(price * 0.08).toLocaleString()}</span>
              </div>
              <div className="price-row">
                <span>Documentation Fee:</span>
                <span>$500</span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span>
                  ${(
                    (discountedPrice || price) + 
                    Math.round(price * 0.08) + 
                    500
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCard;