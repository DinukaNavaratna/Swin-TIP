import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-notifications/lib/notifications.css';
import { Link } from 'react-router-dom';

class Package extends Component {
  render() {
    const { item } = this.props;
    return (
      <div key={item._id}>
        <Link
          style={{ margin: '0', padding: '0' }}
          to={`/property/${item._id}`}
          className="nav-link"
        >
          <div className="container rounded-0 border border-warning p-0">
            <div className="container p-0">
              <div className="row col-md-12 p-0 m-0">
                <div className="col-md-4">
                  <img
                    className="py-2"
                    alt="packageImg"
                    height="100%"
                    width="100%"
                    src={`${process.env.REACT_APP_BACK_END_URL}/${item.files[0].filePath}`}
                  />
                  <br />
                </div>
                <div className="col-md-8">
                  <h4 className="font-weight-bold text-left mt-4 text-dark">
                    {item.title}
                  </h4>
                  <h6 className="font-weight-bold text-left text-dark">
                    {item.size} {item.sizeType}
                  </h6>
                  <h6 className="font-weight-bold text-left text-secondary">
                    {item.region},{item.propertyType}
                  </h6>
                  <h5 className="font-weight-bold text-left text-info">
                    Rs {item.price}
                    .00
                  </h5>
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
