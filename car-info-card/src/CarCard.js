import React, { useState, useRef, useEffect } from 'react';
import { useFavorites } from './Favourites';
import './CarCard.css';

const CarCard = ({ 
  imageUrl, 
  name, 
  price, 
  discountedPrice, 
  rating: initialRating, 
  availability 
}) => {
  const { addFavorite, removeFavorite, favorites} = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const modalRef = useRef(null);

  // Calculate discount percentage
  const discountPercent = discountedPrice 
    ? Math.round(((price - discountedPrice) / price) * 100) 
    : null;

    const isFavorite = favorites.some(car => car.name === name);

    const handleFavoriteToggle = () => {
      const carDetails = { 
        imageUrl, 
        name, 
        price, 
        discountedPrice, 
        availability 
      };
  
      if (isFavorite) {
        removeFavorite(name);
      } else {
        addFavorite(carDetails);
      }
    };
  

  // Handle rating hover
  const handleRatingHover = (index) => {
    setHoverRating(index);
  };

  // Handle rating change
  const handleRatingChange = (index) => {
    setRating(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

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
        onClick={handleFavoriteToggle}
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
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={`star ${(hoverRating || rating) >= index ? 'filled' : ''}`}
              onMouseEnter={() => handleRatingHover(index)}
              onMouseLeave={() => handleRatingHover(0)}
              onClick={() => handleRatingChange(index)}
            >
              ★
            </span>
          ))}
          <span className="rating-number">({rating})</span>
        </div>
      </div>

      <div className="card-footer">
        <button 
          className="details-button"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          View Price Details
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" ref={modalRef}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
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