import React, { createContext, useState, useContext } from 'react';

// Create Favorites Context
const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {}
});

// Favorites Provider Component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [lastAddedFavorite, setLastAddedFavorite] = useState(null);

  const addFavorite = (car) => {
    // Prevent duplicates
    if (!favorites.some(fav => fav.name === car.name)) {
      const updatedFavorites = [...favorites, car];
      setFavorites(updatedFavorites);
      setLastAddedFavorite(car);
      
      // Clear the last added favorite after 3 seconds
      setTimeout(() => {
        setLastAddedFavorite(null);
      }, 3000);
    }
  };

  const removeFavorite = (carName) => {
    const updatedFavorites = favorites.filter(car => car.name !== carName);
    setFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite, 
      lastAddedFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for using Favorites Context
export const useFavorites = () => useContext(FavoritesContext);