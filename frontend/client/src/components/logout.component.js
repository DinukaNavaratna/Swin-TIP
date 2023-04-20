import React, { Component } from "react";
import { logout } from "../actions/empActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";



class LogoutEmp extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  onClick = (e) => {
    e.preventDefault();
    this.props.logout();


  };

  render() {
    return (
      <div>

        <button
          className="btn btn-primary"
          onClick={this.onClick}
        >
          <strong>Logout</strong>
        </button>
      </div>
    );
  }
}

export default connect(null, { logout })(LogoutEmp);
