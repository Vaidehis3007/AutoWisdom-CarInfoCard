import React from 'react';
import CarCard from './CarCard';
import './App.css';

const App = () => {
  const carData = [
    { 
      imageUrl: '/api/placeholder/300/200', 
      name: 'Tesla Model 3', 
      price: 39990, 
      discountedPrice: 37990, 
      rating: 4.8, 
      availability: 'In Stock' 
    },
    { 
      imageUrl: '/api/placeholder/300/200', 
      name: 'Ford Mustang', 
      price: 27155, 
      rating: 4.5, 
      availability: 'Out of Stock' 
    },
    { 
      imageUrl: '/api/placeholder/300/200', 
      name: 'BMW 3 Series', 
      price: 41250, 
      discountedPrice: 39500, 
      rating: 4.7, 
      availability: 'In Stock' 
    }
  ];

  return (
    <div className="app">
      <div className="container">
        <h1>Featured Cars</h1>
        <div className="car-grid">
          {carData.map((car, index) => (
            <CarCard 
              key={index}
              {...car}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;