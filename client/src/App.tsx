import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cart from './screens/Cart'; // Import multiple components in one line
import Product from './screens/Product';
import DeliveryPage from './screens/DeliveryPage';
import './App.css';
import ProductDetail from './screens/ProductDetail';
import HomePage from './screens/HomePage';

function App() {
  return (

    <Router>
      <div className="App">
        <header>
          <h1>Come shop with us!</h1>
        </header>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/products" element={<Product />} />
          <Route path="/productdetail" element={<ProductDetail />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          {/* Add more routes as needed */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
