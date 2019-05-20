import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Router, Redirect } from 'react-router-dom';
import Login from './containers/Login/Login';
import Resource from './containers/Resource/resource';
import Error from './containers/Error/error';
import Navbar from './components/NavBar/Navbar';
import Project from './containers/Project/Project';
import HeadBar from './components/HeadBar/HeadBar';
import { history } from './_helper/history';
import { connect } from 'react-redux';
import { alertActions } from './_actions/alert.action';
import Formula from './containers/Formula/Formula';
import Template from './containers/Template/Template';

class App extends Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <BrowserRouter>
        <Router history={history}>
          <HeadBar></HeadBar>
          <Navbar></Navbar>

          <div id="mainBody">
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }

            <Switch>
              {this.props.users.loggedIn ? <Route exact path="/resources" component={Resource} /> : null}
              {this.props.users.loggedIn ? <Route exact path="/project" component={Project} /> : null}
              {this.props.users.loggedIn ? <Route exact path="/formula" component={Formula} /> : null}
              {this.props.users.loggedIn ? <Route exact path="/template" component={Template} /> : null}
              {this.props.users.loggedIn ? <Route path='/' component={Resource} /> : null}
              <Route exact path="/login" component={Login} />
              <Redirect from='/' to='/login' />
              <Route component={Error} />
            </Switch>
          </div>
        </Router>

      </BrowserRouter >

    );
  }

}

function mapStateToProps(state) {
  const { alert, users } = state;
  return {
    alert,
    users
  };
}

export default connect(mapStateToProps)(App); 
