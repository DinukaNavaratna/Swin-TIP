import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';

class Package extends Component {
  render() {
    const { item } = this.props;
    return (
      <div key={item.public_id}>
        <Link
          style={{ margin: '0', padding: '0' }}
          to={`/property/${item.public_id}`}
          className="nav-link"
        >
          <div className="container  border border-warning p-0 rounded">
            <div className="container p-0">
              <div className="row col-md-12 p-0 m-0">
                <div className="col-md-4">
                  <img
                    className="py-2"
                    alt="packageImg"
                    height="100%"
                    width="100%"
                    src={`${
                      item.module in
                      ['1', '2', '3', '3', '4', '5', '6', '7', '8', '9', '10']
                        ? `/images/module_img/${item.module}.jpg`
                        : `/images/module_img/10.jpg`
                    }`}
                  />
                  <br />
                </div>
                <div className="col-md-8">
                  <h4 className="font-weight-bold text-left mt-4 text-dark">
                    {item.title}
                  </h4>
                  <h6 className="font-weight-bold text-left text-dark">
                    Description: <br />
                    {item.description}
                  </h6>
                  <h6 className="font-weight-bold text-left text-secondary">
                    Qualifications: <br />
                    {item.qualifications}
                  </h6>
                  <div className="font-weight-bold text-left text-dark small-style-font">
                    Publish Date: {item.publish_date}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, null)(Package);
