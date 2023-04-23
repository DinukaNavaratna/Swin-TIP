import React, {Component, Fragment} from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, Container} from 'reactstrap';
import LogoutEmp from "./logout.component";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class NavbarComponent extends Component {
    state = {
        isExtend : false
    }


    static propTypes = {
        emp: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isExtend : !this.state.isExtend
        });
    }
    render() {

        const {isAuthenticated, user} =  this.props.emp;
        const empLinks = (
            <Fragment>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavItem>
                            <Link to={'/addPackage'}  className="nav-link"> <button className="btn btn-warning" >

                                  <strong> {user ? `Hi ${user.empUn}` : null} </strong>

                            </button>
                            </Link>
                        </NavItem>
                    </li>
                    <li className="nav-item">
                        <NavItem>
                            <Link to={'/addPackage'}  className="nav-link"> <button className="btn btn-primary" >

                                <strong> Add Package </strong>

                            </button>
                            </Link>
                        </NavItem>
                    </li>
                    <li className="nav-item">
                        <NavItem>
                            <Link  className="nav-link"> <LogoutEmp/> </Link>

                        </NavItem>
                    </li>
                </ul>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                         <NavItem>
                                <Link to={'/loginEmp'}  className="nav-link"> <button className="btn btn-primary">Employee</button></Link>
                         </NavItem>
                    </li>
                </ul>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <Link to={'/'}  className="nav-link"><NavbarBrand >CelTel Telecommunications</NavbarBrand></Link>


                            <Nav className="ml-auto" navbar>
                                <ul className="navbar-nav ">


                                    <li className="nav-item">
                                        {isAuthenticated ? empLinks : guestLinks}
                                    </li>



                                </ul>
                            </Nav>

                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapsStateToProps = state => ({
    emp: state.emp
});

export default connect(mapsStateToProps, null) (NavbarComponent);