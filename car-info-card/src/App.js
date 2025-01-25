import React, { useState } from "react";
import CarCard from "./CarCard";
import { FavoritesProvider, useFavorites } from "./Favourites";
import "./App.css";
import teslaImage from "./images/tesla.jpg";
import bmwImage from "./images/bmw.jpg";
import fordImage from "./images/ford.jpg";


const AppContent = () => {
  const { favorites, lastAddedFavorite, removeFavorite } = useFavorites();
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const carData = [
    {
      imageUrl: teslaImage,
      name: "Tesla Model 3",
      price: 39990,
      discountedPrice: 37990,
      rating: 4.8,
      availability: "In Stock",
    },
    {
      imageUrl: fordImage,
      name: "Ford Mustang",
      price: 27155,
      rating: 4.5,
      availability: "Out of Stock",
    },
    {
      imageUrl: bmwImage,
      name: "BMW 3 Series",
      price: 41250,
      discountedPrice: 39500,
      rating: 4.7,
      availability: "In Stock",
    },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Auto Wisdom</h1>
        </div>
        <div className="navbar-actions">
          <div className="favorites-section">
            <button
              className="favorites-toggle"
              onClick={() => setFavoritesOpen(!favoritesOpen)}
            >
              Favourites ({favorites.length})
            </button>
            {favoritesOpen && (
              <div className="favorites-dropdown">
                {favorites.length > 0 ? (
                  favorites.map((car) => (
                    <div key={car.name} className="favorite-item">
                      <div>
                        <p>{car.name}</p>
                        <p>${car.discountedPrice || car.price}</p>
                        <p>Availability: {car.availability}</p>
                      </div>
                      <button onClick={() => removeFavorite(car.name)}>
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="no-favorites">No favorites yet</p>
                )}
              </div>
            )}
          </div>
          <button className="login-button">Login</button>
        </div>
      </nav>

      {lastAddedFavorite && (
        <div className="favorite-popup">
          Added to Favorites: {lastAddedFavorite.name}
        </div>
      )}

      <main>
        <div className="container">
          <h1>Featured Cars</h1>
          <div className="car-grid">
            {carData.map((car, index) => (
              <CarCard key={index} {...car} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <FavoritesProvider>
    <AppContent />
  </FavoritesProvider>
);

export default App;
