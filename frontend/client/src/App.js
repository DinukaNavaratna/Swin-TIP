import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import disableBrowserBackButton from 'disable-browser-back-navigation';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/empActions";
import LoginEmp from "./components/login.component";
import LoginApplicant from "./components/applicantLogin.component";
import NavbarComponent from "./components/navbar.component";
import JobList from "./components/jobList.component";
import SearchJobList from "./components/searchJobList.component";
import RegisterEmp from "./components/register.component";
import RegisterApplicant from "./components/applicantRegister.component";
import AddJob from "./components/addJob.component";




class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
    disableBrowserBackButton();
  }

  render() {
    return (
        <div>

          <Router>
            <Provider store={store}>

                <NavbarComponent/>
                <div className="container">

                  <Switch>
                    <Route exact path='/' component={JobList}/>
                    <Route exact path='/loginEmp' component={LoginEmp}/>
                    <Route exact path='/loginApplicant' component={LoginApplicant}/>
                    <Route exact path='/search' component={SearchJobList}/>
                    <Route exact path='/registerEmp' component={RegisterEmp}/>
                    <Route exact path='/registerApplicant' component={RegisterApplicant}/>
                    <Route exact path='/addJob' component={AddJob}/>




                  </Switch>
                </div>

            </Provider>
          </Router>


        </div>

    );
  }
}

export default App;
