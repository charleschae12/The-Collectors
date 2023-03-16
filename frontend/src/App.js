import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import Clubs from "./pages/Clubs";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/Clubs" element={<Clubs />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
