import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SimilarAd from './similarAd';
import PhoneIcon from '@material-ui/icons/Phone';
import ScoreComponent from '../ScoreCard/score-card';
import DemandForecasting from '../DemandForecasting';
import { Link } from 'react-router-dom';
import StreetviewIcon from '@material-ui/icons/Streetview';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Grid from '@material-ui/core/Grid';
import { GoogleStreetViewComponent } from '../GoogleMap/google-map';
import FeaturePrediction from '../FeaturePrediction/featurePrediction';

class SingleProperty extends Component {
  state = {
    carouselDisplay: 'images',
    files: null,
    title: '',
    propertyType: '',
    region: '',
    sizeType: '',
    size: '',
    addr: '',
    contactNum: '',
    des: '',
    starGrade: '',
    coordinates: null,
    price: '',
    valuation: '',
    attraction: null,
    accessibility: null,
    competition: null,
    demand: null,
    pager: {},
    pageOfItems: [],
  };

  onChangeToggle = (event, val) => {
    if (val === null) {
      this.setState({
        carouselDisplay: this.state.carouselDisplay,
      });
    } else {
      this.setState({
        carouselDisplay: val,
      });
    }
    console.log(this.state.carouselDisplay);
  };

  onSimilarAdClick = () => {
    this.setState({
      files: null,
    });
  };

  componentDidMount() {
    this.loadPage();
  }

  // componentDidUpdate() {
  //   this.loadPage();
  // }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };

  loadPage = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_END_URL}/properties/` +
          this.props.match.params.id
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          propertyType: response.data.propertyType,
          region: response.data.region,
          sizeType: response.data.sizeType,
          size: response.data.size,
          addr: response.data.addr,
          des: response.data.des,
          starGrade: response.data.starGrade,
          coordinates: response.data.coordinates,
          price: response.data.price,
          contactNum: response.data.contactNum,
          valuation: response.data.valuation,
          attraction: response.data.attraction,
          accessibility: response.data.accessibility,
          competition: response.data.competition,
          demand: { data: response.data.demand },
          files: response.data.files,
          date: response.data.date.substring(0, 10),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    // get page details and items from api
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.state.pager.currentPage) {
      fetch(
        `${process.env.REACT_APP_BACK_END_URL}/properties/paginate?page=${page}&sitem=Commercial Land`,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then(({ pager, pageOfItems }) => {
          this.setState({ pager, pageOfItems });
        });
    }
  };

  /*http://localhost:3001/properties/paginate?page=${page}&sitem=${this.state.query}*/

  render() {
    return (
      <>
        {' '}
        {this.state.files && (
          <>
            <div className="container border my-3">
              <h3 className="font-weight-bold text-left mt-4 text-dark">
                {this.state.title}
              </h3>
              <p className="text-left mt-1 text-secondary">
                Posted on {this.state.date} | {this.state.region}
              </p>
              {this.state.carouselDisplay === 'images' ? (
                <Carousel
                  autoPlay={3000}
                  infiniteLoop={true}
                  className="px-0 py-1"
                >
                  <div>
                    <img
                      src={`${process.env.REACT_APP_BACK_END_URL}/${this.state.files[0].filePath}`}
                    />
                  </div>
                  <div>
                    <img
                      src={`${process.env.REACT_APP_BACK_END_URL}/${this.state.files[1].filePath}`}
                    />
                  </div>
                  <div>
                    <img
                      src={`${process.env.REACT_APP_BACK_END_URL}/${this.state.files[2].filePath}`}
                    />
                  </div>
                </Carousel>
              ) : (
                <div className="px-0 py-1">
                  <GoogleStreetViewComponent
                    loadCoordinates={(lt, lg) => this.loadCoordinates(lt, lg)}
                    loadRequiredDetails={(data) =>
                      this.getUserEnteredData(data)
                    }
                    lat={this.state.coordinates.lat}
                    long={this.state.coordinates.long}
                    isOpenModal={this.state.isOpenModal}
                    openScreen={() => this.openScreen()}
                    closeScreen={() => this.closeScreen()}
                  />
                </div>
              )}
              <div className="row p-0 d-flex justify-content-end">
                <Grid item className="pr-3">
                  <ToggleButtonGroup
                    size="large"
                    className="p-0"
                    value={this.state.carouselDisplay}
                    exclusive
                    onChange={this.onChangeToggle}
                  >
                    <ToggleButton value="images" className="p-0">
                      <PhotoSizeSelectActualIcon
                        color="primary"
                        style={{ fontSize: 50 }}
                        className="px-1 py-1"
                      />
                    </ToggleButton>
                    <ToggleButton value="streetView" className="p-0">
                      <StreetviewIcon
                        color="primary"
                        style={{ fontSize: 50 }}
                        className="px-1 py-1"
                      />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </div>
              <h3 className="font-weight-bold text-left text-info">
                Rs {this.state.price}.00
              </h3>
              <h5 className="text-left mt-1 text-secondary">
                Property Type : {this.state.propertyType}
              </h5>
              <h5 className="text-left mt-1 text-secondary">
                Size : {this.state.size} {this.state.sizeType}
              </h5>
              <h5 className="font-weight-bold text-left mt-4 text-dark">
                Description
              </h5>
              <p className="text-left mt-0 text-dark">{this.state.des}</p>
              <div className="row p-0 m-0">
                <PhoneIcon className="Col" />
                <h5 className="font-weight-bold text-left mt-0 text-dark Col">
                  {this.state.contactNum}
                </h5>
              </div>
              <br />{' '}
              <ScoreComponent
                accessibility={this.state.accessibility}
                attraction={this.state.attraction}
                popularity={this.state.competition}
                demand={this.state.demand}
              />{' '}
              <br /> <DemandForecasting demand={this.state.demand} />
              <br />
              <div className="px-3">
                <FeaturePrediction />
              </div>
              <br />
              <div className="px-0 mb-3">
                <Link
                  to={
                    '/analyzer/' +
                    this.state.coordinates.lat +
                    '-' +
                    this.state.coordinates.long
                  }
                  className="nav-link"
                >
                  <button className="btn btn-danger col-md-12">
                    <br />
                    <strong className="text-warning"> Important : </strong>
                    <strong className="text-white">
                      {' '}
                      This is the Typical Prediction for a{' '}
                      {this.state.starGrade} Star Hotel. Click Here to Use Our{' '}
                    </strong>
                    <strong className="text-warning"> Valuator </strong>
                    <strong className="text-white">
                      {' '}
                      for a More Customizable Prediction.
                    </strong>
                    <br />
                    <br />
                  </button>
                </Link>
              </div>
            </div>

            <div className="container p-0">
              <div className="col-md-12 m-0 text-center justify-content-center row p-0 m-0">
                <div className="col-md-12 p-0 mb-2 mt-2 mx-0">
                  <div className="card text-center">
                    <div className="card-header p-1 text-left">
                      <p className="font-weight-bold p-0 ml-3 m-0">
                        Similar Properties
                      </p>{' '}
                      {/*jst 4 needed*/}
                    </div>
                    <div className="card-body text-center">
                      {this.state.pageOfItems[0] && (
                        <>
                          <SimilarAd item={this.state.pageOfItems[0]} />
                        </>
                      )}
                      {this.state.pageOfItems[1] && (
                        <>
                          <SimilarAd item={this.state.pageOfItems[1]} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
