import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../components/Logo.png';
import backgroundImage from '../image/login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
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
