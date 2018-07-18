import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Switch,
  // Redirect
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from "react-redux";
import store from './store';

import Landing from './components/layout/Landing';
import Readings from './components/readings/Readings';
import Spinner from './components/common/Spinner';
import './App.css';
import { clearCurrentProfile } from './actions/readingsActions';
import Navbar from './components/layout/Navbar';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current Profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login';
  }
}


// const NoMatch = ({ location }) => {
//   return (
//     <div>
//       <h3>ERROR 404: <code>{location.pathname}</code></h3>
//     </div>
//   )
// }
class App extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.setState({ isLoading: false })
  }
  renderHTML = (
    <div className="container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        {/* <Route exact path="/register" component={Register} /> */}
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/readings" component={Readings} />
        <Route exact path="*" component={Landing} />
      </Switch>
    </div>
  )
  mount
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {this.state.isLoading ? <Spinner /> : this.renderHTML}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
