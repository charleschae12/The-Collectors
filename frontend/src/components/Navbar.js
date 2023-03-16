import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

function Navbar() {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
        <Link to="/Clubs">Clubs</Link>
      </li>
    </div>
  )
}

export default Navbar