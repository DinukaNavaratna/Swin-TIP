import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import LogoutEmp from '../LoginLogoutRegister/logout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';

class NavigationBar extends Component {
  state = {
    isExtend: false,
    dropdownOpen: false,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  setDropdownOpen = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  toggle = () => {
    this.setState({
      isExtend: !this.state.isExtend,
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.user;
    const empLinks = (
      <Fragment>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item pl-0">
            <NavItem>
              <Link to={'/profile'} className="nav-link">
                {' '}
                <button className="btn btn-warning">
                  <strong> {user ? `Hi ${user.uName}` : null} </strong>
                </button>
              </Link>
            </NavItem>
          </li>
          <li className="nav-item">
            <NavItem>
              <Link className="nav-link">
                {' '}
                <LogoutEmp />{' '}
              </Link>
            </NavItem>
          </li>
        </ul>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <ul className="navbar-nav mr-auto pl-0 ml-2">
          {/*<li className="nav-item pl-0">
            <NavItem>
              <Link to={"/dashboard"} className="nav-link pl-0">
                {" "}
                <button
                  className="btn btn-secondary"
                  style={{ marginRight: "10px" }}
                >
                  <strong>Dashboard</strong>
                </button>
              </Link>
            </NavItem>
          </li>*/}
          <li className="nav-item pl-0">
            <NavItem>
              <Link to={'/profile'} className="nav-link pl-0">
                {' '}
                <button className="btn btn-warning">
                  <strong>Sign In</strong>
                </button>
              </Link>
            </NavItem>
          </li>
        </ul>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-0 mx-0 px-0">
          <Container className="px-0">
            <Link to={'/'} className="nav-link">
              <NavbarBrand>
                <div className="row m-0 p-0">
                  <img height="30" src="../../logo.png" />
                  <div className="row p-0 m-0">
                    <h4 className="py-0 my-0 text-primary">Land</h4>
                    <h4 className="py-0 my-0 ">Val</h4>
                  </div>
                </div>
              </NavbarBrand>
            </Link>

            <Nav className="ml-auto" navbar>
              <ul className="navbar-nav ">
                <div className="row p-0 m-0">
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.setDropdownOpen}
                    className="pt-2 pb-0 mr-2"
                  >
                    <DropdownToggle caret color="primary" className="p-1 pb-0">
                      <MenuIcon className="mb-1" />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Services</DropdownItem>
                      <DropdownItem tag={Link} to="/analyzer">
                        Valuator
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/listing">
                        Listing
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/postAd">
                        Post Ad
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/infoPortal">
                        Info Portal
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem header>Other</DropdownItem>
                      <DropdownItem tag={Link} to="/about">
                        About Us
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/contact">
                        Contact Us
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/help">
                        Help
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <li className="nav-item pl-0">
                    {isAuthenticated ? empLinks : guestLinks}
                  </li>
                </div>
              </ul>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapsStateToProps, null)(NavigationBar);
