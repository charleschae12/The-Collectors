import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import Clubs from "./pages/Clubs";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Calander from "./pages/Calender";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import GreekLife from './pages/GreekLife';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Clubs" element={<Clubs />}/>
        <Route path="/GreekLife" element={<GreekLife />}/>
        <Route path="/Events" element={<Events />}/>
        <Route path="/Calander" element={<Calander />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
