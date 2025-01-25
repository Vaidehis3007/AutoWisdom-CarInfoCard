import React, { useState } from 'react';
import CarCard from './CarCard';
import './App.css';
import teslaImage from './images/tesla.jpg'
import bmwImage from './images/bmw.jpg'
import fordImage from './images/ford.jpg'

const App = () => {

  const [favorites, setFavorites] = useState([]);
  const [lastAddedFavorite, setLastAddedFavorite ] = useState(null);

  const carData = [
    { 
      imageUrl: teslaImage, 
      name: 'Tesla Model 3', 
      price: 39990, 
      discountedPrice: 37990, 
      rating: 4.8, 
      availability: 'In Stock' 
    },
    { 
      imageUrl: fordImage, 
      name: 'Ford Mustang', 
      price: 27155, 
      rating: 4.5, 
      availability: 'Out of Stock' 
    },
    { 
      imageUrl: bmwImage, 
      name: 'BMW 3 Series', 
      price: 41250, 
      discountedPrice: 39500, 
      rating: 4.7, 
      availability: 'In Stock' 
    }
  ];

  const addToFavorites = (car) => {
    if (!favorites.some(fav => fav.name === car.name)) {
      const updatedFavorites = [...favorites, car];
      setFavorites(updatedFavorites);

      setLastAddedFavorite(car);
      setTimeout(() => setLastAddedFavorite(null), 3000);
    }
  };

  const removeFromFavorites = (carName) => {
    const updatedFavorites = favorites.filter(car => car.name !==carName);
    setFavorites(updatedFavorites);
  }

  return (
    <div className='app'>
      <nav className='navbar'>
        <div className='navbar-brand'>
          <h1>Auto Wisdom</h1>
        </div>
        <div className='navbar-actions'>
        <div className='favorites-section'>
            <button className='favorites-toggle'>
              Favorites ({favorites.length})
            </button>
            {favorites.length > 0 && (
              <div className='favorites-dropdown'>
                {favorites.map(car => (
                  <div key={car.name} className='favorite-item'>
                    <img src={car.imageUrl} alt={car.name} />
                    <div>
                      <p>{car.name}</p>
                      <p>${car.discountedPrice || car.price}</p>
                      <button onClick={() => removeFromFavorites(car.name)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className='login-button'>Login</button>
        </div>
      </nav>

      {lastAddedFavorite && (
        <div className='favorite-popup'>
          Added to Favorites: {lastAddedFavorite.name}
        </div>
      )}

      <main>
      <div className="container">
        <h1>Featured Cars</h1>
        <div className="car-grid">
          {carData.map((car, index) => (
            <CarCard 
              key={index}
              {...car}
              onFavoriteToggle={(isFavorite) => 
                isFavorite ? addToFavorites(car) : removeFromFavorites(car.name)
              }
            />
          ))}
        </div>
      </div>
      </main>
    </div>
  );
};

export default App;