import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Login from '../LoginLogoutRegister/login';
import LinearIndeterminate from '../LinearIndeterminate/progressBar';
import { NavItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class Profile extends Component {
  state = {
    title: '',
    propertyType: '',
    progress: false,
    msg: null,
    properties: null,
    valuations: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.user.user) {
      this.loadData();
    }
  }

  componentDidUpdate() {
    if (this.props.user.user && !this.state.valuations) {
      this.loadData();
    }
  }

  loadData() {
    console.log(this.props.user.user.uName);
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_URL}/valuations/list/` +
          this.props.user.user.uName
      )
      .then((response) => {
        this.setState({ valuations: response.data });
        console.log(this.state.valuations);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_URL}/properties/list/` +
          this.props.user.user.uName
      )
      .then((response) => {
        this.setState({ properties: response.data });
        console.log(this.state.properties);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onValuationDelete = (id) => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/valuations/delete/` + id)
      .then((data) => {
        if (data.data.success) {
          swal('Successful', 'Valuation Deleted', 'success');
          this.loadData();
        }
      })
      .catch((err) => {
        swal('Unsuccessful', 'Valuation Deletion Failed', 'error');
      });
  };

  onAdDelete = (id) => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/properties/delete/` + id)
      .then((data) => {
        if (data.data.success) {
          swal('Successful', 'Advertisement Deleted', 'success');
          this.loadData();
        }
      })
      .catch((err) => {
        swal('Unsuccessful', 'Advertisement Deletion Failed', 'error');
      });
  };

  render() {
    const { isAuthenticated } = this.props.user;

    return (
      <div>
        {!isAuthenticated ? (
          <Login />
        ) : (
          <div className="container my-5">
            <div>
              <br />
              <div className="row p-0 m-0 d-flex justify-content-between">
                <div className="col p-0 m-0">
                  <h6 className="text-secondary font-weight-bold m-0">
                    Saved Valuations
                  </h6>
                </div>
                <Link to={'/analyzer'} className="nav-link p-0 pb-2">
                  <button className="btn btn-success py-0">
                    <strong className="py-0">New Valuation</strong>
                  </button>
                </Link>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>Details</th>
                    {window.innerWidth < 768 ? (
                      <>
                        <th className="text-center">Ratings</th>
                      </>
                    ) : (
                      <>
                        <th className="text-center">Attraction Rating</th>
                        <th className="text-center">Accessibility Rating</th>
                        <th className="text-center">Popularity Rating</th>
                        <th className="text-center">Demand Rating</th>
                      </>
                    )}
                    <th className="text-right">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {(this.state.valuations && this.state.valuations.length) >
                  0 ? (
                    <>
                      {this.state.valuations.map((item) => (
                        <tr>
                          <td>
                            <div>Label : {item.label}</div>
                            <div>Longitude : {item.coordinates.long}</div>
                            <div>Latitude : {item.coordinates.lat}</div>
                          </td>
                          {window.innerWidth < 768 ? (
                            <>
                              <td className="text-center">
                                <div>Attraction : {item.attraction}%</div>
                                <div>Attraction : {item.accessibility}%</div>
                                <div>Attraction : {item.competition}%</div>
                                <div>Attraction : {item.demand}%</div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="text-center">
                                {item.attraction}%
                              </td>
                              <td className="text-center">
                                {item.accessibility}%
                              </td>
                              <td className="text-center">
                                {item.competition}%
                              </td>
                              <td className="text-center">{item.demand}%</td>
                            </>
                          )}
                          <td className="text-right">
                            <button
                              className="btn btn-danger py-0"
                              onClick={() => this.onValuationDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <div className="text-left">
                      <p className="text-secondary m-0 p-0 pl-2 text-left">
                        No Saved Valuations
                      </p>
                    </div>
                  )}
                </tbody>
              </Table>
              <br />
              <div className="row p-0 m-0 d-flex justify-content-between">
                <div className="col p-0 m-0">
                  <h6 className="text-secondary font-weight-bold m-0">
                    Posted Advertisements
                  </h6>
                </div>
                <Link to={'/postAd'} className="nav-link p-0 pb-2">
                  <button className="btn btn-success py-0">
                    <strong className="py-0">Post New Ad</strong>
                  </button>
                </Link>
              </div>

              <Table>
                <thead>
                  <tr>
                    <th>Details</th>
                    <th className="text-right">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {(this.state.properties && this.state.properties.length) >
                  0 ? (
                    <>
                      {this.state.properties.map((item) => (
                        <tr>
                          <td>
                            <div>Title : {item.title}</div>
                            <div>Posted Date : {item.date.substr(0, 10)}</div>
                            <div>Address : {item.addr}</div>
                          </td>
                          <td className="text-right">
                            <button
                              className="btn btn-danger py-0"
                              onClick={() => this.onAdDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <div className="text-left">
                      <p className="text-secondary m-0 p-0 pl-2 text-left">
                        No Posted Advertisements
                      </p>
                    </div>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
