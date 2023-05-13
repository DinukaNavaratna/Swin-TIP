import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';
import { Alert } from 'reactstrap';
import swal from 'sweetalert';

class Register extends Component {
  state = {
    uName: '',
    uEmail: '',
    uPw: '',
    uConfirmPw: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  registerClose = () => {
    this.props.clearErrors();
    this.setState({
      uName: '',
      uEmail: '',
      uPw: '',
      uConfirmPw: '',
      msg: null,
      msgtop: null,
    });

    this.props.history.push('/postAd');
  };

  componentDidUpdate = (prevProps) => {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
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
      this.registerClose();
    }
  };

  onChangeUName = (e) => {
    this.setState({
      uName: e.target.value,
    });
  };

  onChangeUEmail = (e) => {
    this.setState({
      uEmail: e.target.value,
    });
  };

  onChangeUPw = (e) => {
    this.setState({
      uPw: e.target.value,
    });
  };

  onChangeUConfirmPw = (e) => {
    if (e.target.value !== this.state.uPw) {
      this.setState({
        uConfirmPw: e.target.value,
        msgtop: 'Confirm Password Does Not Match',
      });
    }
    if (e.target.value === this.state.uPw) {
      this.setState({
        uConfirmPw: e.target.value,
        msgtop: '',
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { uName, uEmail, uPw } = this.state;
    const newUser = {
      uName,
      uEmail,
      uPw,
    };

    this.props.register(newUser);

    this.setState({
      uName: '',
      uEmail: '',
      uPw: '',
      uConfirmPw: '',
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
            <label>Username :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.uName}
              onChange={this.onChangeUName}
              maxLength="10"
            />
          </div>

          <div className="form-group">
            <label>Email Address :</label>
            <input
              type="email"
              className="form-control"
              value={this.state.uEmail}
              onChange={this.onChangeUEmail}
            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.uPw}
              onChange={this.onChangeUPw}
              minLength="5"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.uConfirmPw}
              onChange={this.onChangeUConfirmPw}
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
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
