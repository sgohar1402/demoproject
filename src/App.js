// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import AddProduct from './Pages/AddProduct';
import ProtectedRoute from './ProtectedRoute';
import Kanban from './Pages/Kanban';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanban" element={<Kanban />} />

        {/* Wrap the Products route in a ProtectedRoute */}
        <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
        
      </Routes>
    </Router>
  );
};

export default App;
