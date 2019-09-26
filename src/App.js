import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import { Provider } from 'react-redux';
//import { createStore } from 'redux'
//import rootReducer from './redux/reducers/index'

import { PersistGate } from 'redux-persist/integration/react'
import configStore from './redux/configureStore'


import NavBar from './components/NavBar';
import Footer from './components/Footer';

import PrivateRoute from './guard/auth'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Shop from './pages/Shop'
import Register from './pages/Register'
import Cart from './pages/Cart'


//const store = createStore(rootReducer)
const { store, persistor } = configStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/about" component={About} />
              <Route path="/register" component={Register} />
              <Route path="/shop/:id" component={Shop} />
              <Route path="/cart" component={Cart} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Router>
        </PersistGate>

      </Provider >

    </>

  );
}

export default App;