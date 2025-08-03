import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
  // State for registration fields
  const [regData, setRegData] = useState({
    firstname: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input change for registration
  const handleRegChange = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration submit

const handleSignup = (e) => {
  e.preventDefault();
  console.log('✅ handleSignup called');
  console.log('📦 Registration Data:', regData);

  axios.post('http://localhost:3000//api/register', regData)
    .then((response) => {
      console.log('✅ Registration successful:', response.data);
    })
    .catch((error) => {
      console.error('❌ Error during registration:', error);
    });
};


  return (
    <>
      <div className="container">
        <input type="checkbox" id="signup_toggle" />
        <form className="form"  onSubmit={handleSignup}>
          <div className="form_front">
            <div className="form_details">Login</div>
            <input placeholder="Username" className="input" type="text" />
            <input placeholder="Password" className="input" type="text" />
            <button className="btn">Login</button>
            <span className="switch">
              Don't have an account?
              <label className="signup_tog" htmlFor="signup_toggle">
                Sign Up
              </label>
            </span>
          </div>
          <div className="form_back">
            <div className="form_details">SignUp</div>
            <input
              placeholder="Firstname"
              className="input"
              type="text"
              name="firstname"
              value={regData.firstname}
              onChange={handleRegChange}
            />
            <input
              placeholder="Username"
              className="input"
              type="text"
              name="username"
              value={regData.username}
              onChange={handleRegChange}
            />
            <input
              placeholder="Password"
              className="input"
              type="text"
              name="password"
              value={regData.password}
              onChange={handleRegChange}
            />
            <input
              placeholder="Confirm Password"
              className="input"
              type="text"
              name="confirmPassword"
              value={regData.confirmPassword}
              onChange={handleRegChange}
            />
            <button className="btn" type="submit">
              Signup
            </button>
            <span className="switch">
              Already have an account?
              <label className="signup_tog" htmlFor="signup_toggle">
                Sign In
              </label>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
