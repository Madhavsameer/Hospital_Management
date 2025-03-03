import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import StoreData from './components/StoreData';
import FetchData from './components/FetchData';
import BackupData from './components/BackupData';
import RestoreData from './components/RestoreData';
import Landing from './components/LandingPage';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<StoreData />} />
        <Route path="/fetch" element={<FetchData />} />
        <Route path="/backup" element={<BackupData />} />
        <Route path="/restore" element={<RestoreData />} />
      </Routes>
    </Router>
  );
};

export default App;
