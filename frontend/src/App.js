import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import store from './store';
import { loadUser } from './actions/userActions';
import Login from './components/LoginLogoutRegister/login';
import NavbarComponent from './components/Navbar/navbar';
import Analyzer from './components/Analyzer/analyzer';
import Register from './components/LoginLogoutRegister/register';
import ScoreComponent from './components/ScoreCard/score-card';
import Home from './components/Home/home';
import Dashboard from './components/Dashboard/home/Home.jsx';
import PropertyListView from './components/Listing/lisitng';
import SingleProperty from './components/SingleProperty/singleProperty';
import customAnalyzer from './components/CustomAnalyzer/customAnalyzer';
import postAd from './components/PostAd/postAd';
import InfoPortal from './components/InfoPortal/infoPortal';
import Profile from './components/Profile/profile';
import Footer from './components/Footer/footer';
import About from './components/About/About';
import Help from './components/Help/Help';
import Contact from './components/Contact/Contact';

dotenv.config();

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div>
        <Router>
          <Provider store={store}>
            <NavbarComponent />
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/analyzer" component={Analyzer} />
                <Route exact path="/postAd" component={postAd} />
                <Route exact path="/listing" component={PropertyListView} />
                <Route exact path="/infoPortal" component={InfoPortal} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/scoreCard" component={ScoreComponent} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/property/:id" component={SingleProperty} />
                <Route exact path="/about" component={About} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/contact" component={Contact} />
                <Route
                  exact
                  path="/analyzer/:coordinates"
                  component={customAnalyzer}
                />
                <Route
                  path="/facebook"
                  component={() => {
                    window.location.href =
                      'https://www.facebook.com/LandValServices';
                    return null;
                  }}
                />
                <Route
                  path="/youtube"
                  component={() => {
                    window.location.href =
                      'https://www.youtube.com/channel/UCH6VeQBIpwR5DyDHdSTc-Yw';
                    return null;
                  }}
                />
              </Switch>
            </div>
            <Footer />
          </Provider>
        </Router>
      </div>
    );
  }
}

export default App;
