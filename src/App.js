import React from 'react'
import './App.css';
import { AppRoute } from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/Navbar';
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (    
    <div className="App">
      <NavbarComp />
      <Router>
        <AppRoute />
      </Router>
    </div>
  );
}

export default App;

