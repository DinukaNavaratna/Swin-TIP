import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PhoneIcon from '@material-ui/icons/Phone';

class SingleProperty extends Component {
  state = {
    base: '',
    description: '',
    edit_date: '',
    last_edited_by: '',
    location: '',
    module: '',
    num_applicants: '',
    public_id: '',
    publish_date: '',
    published_by: '',
    qualifications: '',
    title: '',
  };

  componentDidMount() {
    let localValue = JSON.parse(localStorage.getItem('vacancy'));
    console.log('sasasasas', localValue);
    this.setState(localValue['item']);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };

  render() {
    return (
      <>
        {' '}
        {
          <>
            <div className="container border my-3">
              <h3 className="font-weight-bold text-left mt-4 text-dark">
                {this.state.title}
              </h3>
              <p className="text-left mt-1 text-secondary">
                Posted on {this.state.publish_date} | {this.state.location}
              </p>
              {
                <Carousel
                  autoPlay={4000}
                  height={60}
                  infiniteLoop={true}
                  className="px-0 py-1"
                >
                  <div>
                    <img
                      src={`https://i.ytimg.com/vi/hE6sApAhkxw/maxresdefault.jpg`}
                    />
                  </div>
                  <div>
                    <img
                      src={`https://i.ytimg.com/vi/D6KdJwHKMLA/maxresdefault.jpg`}
                    />
                  </div>
                </Carousel>
              }
              <h5 className="text-left mt-1 text-secondary">
                Qualifications : {this.state.qualifications}
              </h5>
              <h5 className="text-left mt-1 text-secondary">
                Number of Applicants : {this.state.num_applicants}
              </h5>
              <h5 className="text-left mt-1 text-secondary">
                Module : {this.state.module}
              </h5>
              <h5 className="text-left mt-1 text-secondary">
                Base : {this.state.base}
              </h5>
              <h5 className="text-left mt-1 text-secondary">
                Published By : {this.state.published_by}
              </h5>
              <h5 className="font-weight-bold text-left mt-4 text-dark">
                Description
              </h5>
              <p className="text-left mt-0 text-dark">
                {this.state.description}
              </p>
            </div>
          </>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, null)(SingleProperty);
