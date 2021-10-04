import React, { Component } from 'react';
import NavBar from './components/NavBar'
import HomeContainer from './containers/HomeContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <div>
                <NavBar></NavBar>
      		    	<Route exact path="/" component={HomeContainer}/>
              </div>      
            </Router>
          </PersistGate>
          <ToastContainer />
    </Provider>
    
    );
  }
 
}

export default App;
