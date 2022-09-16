import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoginComponent from './login';
import HomeComponent from './Home';

function App() {
  return (
    <div>
      <Router>      
        <Routes>
          <Route exact path="/" element={<LoginComponent />}/>
          <Route path="/home" element={<HomeComponent />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
