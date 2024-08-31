// src/Form.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';
// Import the sound file
import submitSound from '../assets/submit-sound.mp3';
import useAuth from '../useAuth';

const Home = () => {
  // Initial form data state
  const initialFormData = {
    name: '',
    email: '',
    password: ''
  };
  const auth = useAuth();

  // State to manage form inputs
  const [formData, setFormData] = useState(initialFormData);

  const [isFormValid, setIsFormValid] = useState(false);

  // Hook to play the sound
  const [play] = useSound(submitSound);

  // Validation function for the form inputs
  const validateForm = () => {
    let valid = true;

    // Name validation
    if (formData.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long.");
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      valid = false;
    }

    // Password validation
    if (formData.password.trim().length < 7) {
      toast.error("Password must be at least 7 characters long.");
      valid = false;
    }

    setIsFormValid(valid);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    validateForm();
    if (isFormValid) {
      play(); // Play sound on successful form submission
      toast.success("Login Successfully");
      // Reset form data to initial state

      auth.login();  // Set login status to true
      setFormData(initialFormData);

      // Redirect to Products page after successful login
      navigate('/products');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
        <div className="column w-100 justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
            {/* User Name */}
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="name" className="form-label me-2" style={{ width: '100px' }}>User Name:</label>
              <input 
                type="text" 
                name="name" 
                id="name"
                value={formData.name} 
                onChange={handleChange}
                className="form-control form-control-sm" 
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
            {/* Email */}
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="email" className="form-label me-2" style={{ width: '100px' }}>Email:</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                value={formData.email} 
                onChange={handleChange}
                className="form-control form-control-sm" 
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
            {/* Password */}
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="password" className="form-label me-2" style={{ width: '100px' }}>Password:</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                value={formData.password} 
                onChange={handleChange}
                className="form-control form-control-sm" 
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-12 mx-auto text-center mt-3">
            <button type="submit" className="btn btn-success btn-sm">
              Submit
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </form>
  );
};

export default Home;
