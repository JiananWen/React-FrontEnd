import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Resource from './containers/Resource/resource';
import Error from './containers/Error/error';
import Navbar from './components/NavBar/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/resource" component={Resource} />
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
