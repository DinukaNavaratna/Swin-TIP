import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import axios from 'axios';
import LinearIndeterminate from '../LinearIndeterminate/progressBar';

export default class infoPortal extends Component {
  state = {
    userQuery: '',
    response: null,
    isLoading: false,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  onChangeUserQuery = (e) => {
    this.setState({
      userQuery: e.target.value,
    });
  };

  makeAxiosRequest = async (question) => {
    try {
      return await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/predictions/answer?question=${question}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const question = this.state.userQuery;
    this.makeAxiosRequest(question).then((res) => {
      if (res.data.name === 'Error') {
        swal('Error!', res.data.message, 'error');
      }
      this.setState({
        response: res.data,
      });
      this.setState({ isLoading: false });
    });
  };

  render() {
    return (
      <div
        style={{ marginBottom: (window.innerHeight / 100) * 47 }}
        className="container mt-5"
      >
        <h3>LandVal Information Portal</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter your query :</label>
            <input
              type="text"
              className="form-control"
              value={this.state.userQuery}
              onChange={this.onChangeUserQuery}
              maxLength="350"
              required
            />
          </div>
          {this.state.isLoading && <LinearIndeterminate />}
          {this.state.response !== null && (
            <div>
              <div className="form-group">
                <label>
                  <b>Answer :</b>
                </label>
                <p>{this.state.response.answer}</p>
              </div>
              <div className="form-group">
                <label>
                  <b>Document Title :</b>
                </label>
                <p>{this.state.response.doc_title}</p>
              </div>
              <div className="form-group">
                <label>
                  <b>Paragraph :</b>
                </label>
                <p>{this.state.response.paragraph}</p>
              </div>
            </div>
          )}

          <div style={{ marginTop: '15px' }} className="form-group">
            <input
              type="submit"
              value="Submit Query"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
