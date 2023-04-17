import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../components/Logo.png';
import backgroundImage from '../image/login.png';
import axios from 'axios';
import { AuthContext, useAuth } from '../components/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { authData, setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);

    if (!email || !password) {
      setError("Email and password fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      }, {
        withCredentials: true
      });

      // Store user data and redirect to the main application page
      setAuthData({ isLoggedIn: true, data: response.data });
      navigate('/');

    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 400) {
        setError("Incorrect email or password");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };


  return (
    <div className="login-page-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <div className="header">
          <Link to="/" className="header-link">
            <img src={logo} alt="The Collectors Logo" className="logo" />
            <span className="header-text">The Collectors</span>
          </Link>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        <Link to="/Register">
          <button className="register-button">
            Register
          </button>
        </Link>
        <Link to="/" className="back-button">Back</Link>
      </div>
    </div>
  );
};

export default Login;
