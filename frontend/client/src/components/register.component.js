import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/empActions";
import { clearErrors } from "../actions/errorActions";
import { Alert } from "reactstrap";
import swal from "sweetalert";

class RegisterEmp extends Component {
  state = {
    empUn: "",
    empEmail: "",
    empPw: "",
    empConfirmPw: "",
    empPin: "",
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
      empUn: "",
      empEmail: "",
      empPw: "",
      empConfirmPw: "",
      empPin: "",
      msg: null,
      msgtop: null,
    });

    this.props.history.push("/addPackage");
  };

  componentDidUpdate = (prevProps) => {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.msg) {
      swal("Unsuccessful", this.state.msg, "error");
      this.setState({ msg: null });
    }

    if (isAuthenticated) {
      this.registerClose();
    }
  };

  onChangeEmpUn = (e) => {
    this.setState({
      empUn: e.target.value,
    });
  };

  onChangeEmpEmail = (e) => {
    this.setState({
      empEmail: e.target.value,
    });
  };

  onChangeEmpPw = (e) => {
    this.setState({
      empPw: e.target.value,
    });
  };

  onChangeEmpPin = (e) => {
    this.setState({
      empPin: e.target.value,
    });
  };

  onChangeEmpConfirmPw = (e) => {
    if (e.target.value !== this.state.empPw) {
      this.setState({
        empConfirmPw: e.target.value,
        msgtop: "Confirm Password Does Not Match",
      });
    }
    if (e.target.value === this.state.empPw) {
      this.setState({
        empConfirmPw: e.target.value,
        msgtop: "",
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { empUn, empEmail, empPw, empPin } = this.state;
    const newUser = {
      empUn,
      empEmail,
      empPw,
    };

    if(empPin === "55555") {
      this.props.register(newUser);

      this.setState({
        empUn: "",
        empEmail: "",
        empPw: "",
        empConfirmPw: "",
        empPin: "",
        msg: null,
        msgtop: null,
      });
    }else {
      this.setState({
        empUn: "",
        empEmail: "",
        empPw: "",
        empConfirmPw: "",
        empPin: "",
        msg: null,
        msgtop: "Register Fail, Not an Employee",
      });
    }
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Employee Sign Up</h3>
        <form onSubmit={this.onSubmit}>
          {this.state.msgtop ? (
            <Alert color="danger">{this.state.msgtop}</Alert>
          ) : null}
          <div className="form-group">
            <label>Username :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.empUn}
              onChange={this.onChangeEmpUn}
              maxLength="10"
            />
          </div>

          <div className="form-group">
            <label>Email Address :</label>
            <input
              type="email"
              className="form-control"
              value={this.state.empEmail}
              onChange={this.onChangeEmpEmail}
            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.empPw}
              onChange={this.onChangeEmpPw}
              minLength="5"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password :</label>
            <input
              type="password"
              className="form-control"
              value={this.state.empConfirmPw}
              onChange={this.onChangeEmpConfirmPw}
              minLength="5"
            />
          </div>


          <div className="form-group">
            <label>PIN (To Confirm as a Real Employee) :</label>
            <input
                type="password"
                className="form-control"
                value={this.state.empPin}
                onChange={this.onChangeEmpPin}

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
  isAuthenticated: state.emp.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterEmp
);
