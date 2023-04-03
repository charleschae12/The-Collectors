import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import Clubs from "./pages/Clubs";
import Manage_Clubs from "./pages/Manage_Clubs";
import Search_Clubs from "./pages/Search_Clubs";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Search_Events from "./pages/Search_Events";
import Manage_Events from "./pages/Manage_Events";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Organizations from './pages/Organizations';
import Manage_Organizations from './pages/Manage_Organizations';
import Search_Organizations from './pages/Search_Organizations';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Clubs" element={<Clubs />}/>
        <Route path="/Manage_Clubs" element={<Manage_Clubs />}/>
        <Route path="/Search_Clubs" element={<Search_Clubs />}/>
        <Route path="/Organizations" element={<Organizations />}/>
        <Route path="/Manage_Organizations" element={<Manage_Organizations />}/>
        <Route path="/Search_Organizations" element={<Search_Organizations />}/>
        <Route path="/Events" element={<Events />}/>
        <Route path="/Search_Events" element={<Search_Events />}/>
        <Route path="/Manage_Events" element={<Manage_Events />}/>
        <Route path="/Calendar" element={<Calendar />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
