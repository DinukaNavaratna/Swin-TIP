import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    uName: '',
    uPw: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  loginClose = () => {
    this.props.clearErrors();
    this.setState({
      uName: '',
      uPw: '',
      msg: null,
    });

    this.props.history.push('/postAd');
  };

  componentDidUpdate = (prevProps) => {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.msg) {
      swal('Unsuccessful', this.state.msg, 'error');
      this.setState({ msg: null });
    }

    if (isAuthenticated) {
      this.loginClose();
    }
  };

  onChangeEmpUn = (e) => {
    this.setState({
      uName: e.target.value,
    });
  };

  onChangeEmpPw = (e) => {
    this.setState({
      uPw: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { uName, uPw } = this.state;
    const existUser = {
      uName,
      uPw,
    };

    this.props.login(existUser);

    this.setState({
      empUn: '',
      empPw: '',
      msg: null,
    });
  };

  render() {
    return (
      <div
        style={{ marginBottom: (window.innerHeight / 100) * 41 }}
        className="container mt-5"
      >
        <Link to={'/register'} className="nav-link">
          <button className="btn btn-danger float-right">Register</button>
        </Link>
        <br />
        <br />
        <h3>Sign In</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.uName}
              onChange={this.onChangeEmpUn}
            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.uPw}
              onChange={this.onChangeEmpPw}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
