import React from 'react';
import { BrowserRouter as Router, Route,  Switch } from "react-router-dom";


import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Shop from './pages/Shop'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/shop/:id" component={Shop} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
