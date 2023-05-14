import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';
import { Alert } from 'reactstrap';
import swal from 'sweetalert';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isRegistered: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  registerClose = () => {
    this.props.clearErrors();
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      msg: null,
      msgtop: null,
    });
    swal('Successful', 'Accept the Confirmation Email and Login', 'success');
    this.props.history.push('/');
  };

  componentDidUpdate = (prevProps) => {
    const { error, isRegistered } = this.props; 
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isRegistered) {
      this.registerClose();
    }
  };

  onChangeFirstName = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  onChangeLastName = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onChangeConfirmPassword = (e) => {
    if (e.target.value !== this.state.password) {
      this.setState({
        confirmPassword: e.target.value,
        msgtop: 'Confirm Password Does Not Match',
      });
    }
    if (e.target.value === this.state.password) {
      this.setState({
        confirmPassword: e.target.value,
        msgtop: '',
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = this.state;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    this.props.register(newUser);

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      msg: null,
      msgtop: null,
    });
  };

  render() {
    return (
      <div
        style={{ marginBottom: (window.innerHeight / 100) * 40 }}
        className="container mt-5"
      >
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmit}>
          {this.state.msgtop ? (
            <Alert color="danger">{this.state.msgtop}</Alert>
          ) : null}
          <div className="form-group">
            <label>First Name :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
              maxLength="25"
            />
          </div>

          <div className="form-group">
            <label>Last Name :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangeLastName}
              maxLength="25"
            />
          </div>

          <div className="form-group">
            <label>Email Address :</label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              minLength="5"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword}
              minLength="5"
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  isRegistered: state.user.isRegistered,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
