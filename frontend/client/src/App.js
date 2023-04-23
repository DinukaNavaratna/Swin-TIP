import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import disableBrowserBackButton from 'disable-browser-back-navigation';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/empActions";
import LoginEmp from "./components/login.component";
import NavbarComponent from "./components/navbar.component";
import PackageList from "./components/packageList.component";
import SearchPackageList from "./components/searchPackageList.component";
import RegisterEmp from "./components/register.component";
import AddPackage from "./components/addPackage.component";




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
                    <Route exact path='/' component={PackageList}/>
                    <Route exact path='/loginEmp' component={LoginEmp}/>
                    <Route exact path='/search' component={SearchPackageList}/>
                    <Route exact path='/registerEmp' component={RegisterEmp}/>
                    <Route exact path='/addPackage' component={AddPackage}/>




                  </Switch>
                </div>

            </Provider>
          </Router>


        </div>

    );
  }
}

export default App;
