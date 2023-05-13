import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapComponent from '../MapContainer/map-container';
import ScoreComponent from '../ScoreCard/score-card';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';
import DemandForecasting from '../DemandForecasting';
import LinearIndeterminate from '../LinearIndeterminate/progressBar';
import swal from 'sweetalert';
import FeaturePrediction from '../FeaturePrediction/featurePrediction';
import { Button, Modal } from 'react-bootstrap';
import '../MapContainer/map-container.css';

class Analyzer extends Component {
  state = {
    pager: {},
    pageOfItems: [],
    lat: 6.0535,
    long: 80.221,
    isOpenModal: false,
    isOpenListingModal: true,
    listing: null,
    scoreScreen: false,
    attraction: null,
    accessibility: null,
    popularity: null,
    demand: null,
    features: null,
    progress: false,
    label: null,
    saveValuation: false,
  };

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate() {
    this.loadPage();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };

  loadPage = () => {};

  loadCoordinates = (lt, lg) => {
    this.setState({
      lat: lt,
      long: lg,
    });
  };

  //get data from user's inputs
  getUserEnteredData = async (dataObject) => {
    this.setState({ progress: true });

    dataObject.lat = this.state.lat.trim();
    dataObject.long = this.state.long.trim();

    console.log(dataObject);

    let urlArray = [];
    urlArray.push(
      `${process.env.REACT_APP_BACK_END_URL}/predictions/attraction/?lat=${dataObject.lat}&long=${dataObject.long}&beachAccess=${dataObject.beachAccess}&privateBeach=${dataObject.privateBeach}&starGrade=${dataObject.starGrade}`
    );
    urlArray.push(
      `${process.env.REACT_APP_BACK_END_URL}/predictions/accessibility/?lat=${dataObject.lat}&long=${dataObject.long}&taxi=${dataObject.taxi}&airportShuttle=${dataObject.airportShuttle}&wheelChair=${dataObject.wheelChair}&starGrade=${dataObject.starGrade}`
    );
    urlArray.push(
      `${process.env.REACT_APP_BACK_END_URL}/predictions/popularity/?lat=${dataObject.lat}&long=${dataObject.long}&starGrade=${dataObject.starGrade}`
    );
    urlArray.push(
      `${process.env.REACT_APP_BACK_END_URL}/predictions/demand/?lat=${dataObject.lat}&long=${dataObject.long}`
    );
    urlArray.push(
      `${process.env.REACT_APP_BACK_END_URL}/predictions/features/?lat=${dataObject.lat}&long=${dataObject.long}`
    );

    // sending geodb api request
    let requestUrl = {
      method: 'GET',
      url:
        'https://wft-geo-db.p.rapidapi.com/v1/geo/locations/+' +
        dataObject.lat +
        '+' +
        dataObject.long +
        '/nearbyCities',
      params: {
        radius: '100',
        limit: '1',
        minPopulation: '1',
        types: 'CITY',
        distanceUnit: 'KM',
      },
      headers: {
        'x-rapidapi-key': '28af71b524msh66eb14d617cae69p1c2f22jsn98664e26e806',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      },
    };

    const response = await axios.request(requestUrl);

    const place = {
      city: response.data.data[0].city,
      cityCenter: response.data.data[0].distance,
      province: response.data.data[0].region,
    };

    //sending prediction requests
    let requests = await Promise.all(
      urlArray.map(async (url) => {
        return axios.get(
          `${url}&city=${place.city}&cityCenter=${place.cityCenter}&province=${place.province}`
        );
      })
    );

    const dataPromises = requests.map((request) => request.data);
    const finalData = await Promise.all(dataPromises);
    console.log(finalData);

    this.setState({ attraction: finalData[0] });
    this.setState({ accessibility: finalData[1].data });
    this.setState({ popularity: finalData[2] });
    this.setState({ demand: finalData[3] });
    this.setState({ features: finalData[4] });
    this.setState({ progress: false });
  };

  openScreen = () => this.setState({ scoreScreen: true });
  closeScreen = () => this.setState({ scoreScreen: false });

  closeListingModal = () => this.setState({ isOpenListingModal: false });
  onLoadListing = (e) => {
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/properties`)
      .then((response) => {
        this.setState({ listing: response.data });
        this.closeListingModal();
        console.log(this.state.listing);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      label: this.state.label,
      username: this.props.user.user.uName,
      coordinates: {
        lat: this.state.lat,
        long: this.state.long,
      },
      attraction: this.state.attraction.scoreCard,
      accessibility: this.state.accessibility.score,
      competition: this.state.popularity.predictionValue.popularity_level,
      demand: this.state.demand.data.demand_score,
    };

    axios
      .post(`${process.env.REACT_APP_BACK_END_URL}/valuations/add`, obj)
      .then((res) => {
        if (res.data.success) {
          swal('Good job!', 'Valuation Saved', 'success');
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        swal('Unsuccessful', 'Saving Valuation Failed', 'error');
      });
  };

  saveValuation = () => {
    this.setState({ saveValuation: true });
  };

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <MapComponent
          loadCoordinates={(lt, lg) => this.loadCoordinates(lt, lg)}
          loadRequiredDetails={(data) => this.getUserEnteredData(data)}
          lat={this.state.lat}
          long={this.state.long}
          isOpenModal={this.state.isOpenModal}
          openScreen={() => this.openScreen()}
          closeScreen={() => this.closeScreen()}
          listing={this.state.listing}
        />

        <Modal
          show={this.state.isOpenListingModal}
          onHide={this.closeListingModal}
          centered
          contentClassName="landval-pop-up-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Show Map With Property Listings</Modal.Title>
          </Modal.Header>

          <Modal.Body
            className={'landval-body-container'}
            style={{ marginTop: '20px', marginBottom: '25px' }}
          >
            <div className="row p-0 m-0 justify-content-center">
              <Button variant="yes-button" onClick={this.onLoadListing}>
                Yes
              </Button>
              <div style={{ width: '30px' }}></div>
              <Button variant="no-button" onClick={this.closeListingModal}>
                No
              </Button>
            </div>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal>

        <div className="container">
          {this.state.progress ? (
            <>
              <br />
              <LinearIndeterminate />
              <br />
            </>
          ) : (
            <>
              {this.state.popularity &&
                this.state.accessibility &&
                this.state.attraction &&
                this.state.demand &&
                this.state.features && (
                  <>
                    {' '}
                    <br />{' '}
                    <ScoreComponent
                      accessibility={this.state.accessibility}
                      attraction={this.state.attraction}
                      popularity={this.state.popularity}
                      demand={this.state.demand}
                    />{' '}
                    <br /> <DemandForecasting demand={this.state.demand} />
                    <br />
                    <div className="px-3">
                      <FeaturePrediction features={this.state.features} />
                    </div>
                    <br />
                    {this.props.user.user && this.props.user.user.uName && (
                      <>
                        {this.state.saveValuation ? (
                          <form onSubmit={this.onSubmit}>
                            <div className="row p-0 m-0 d-flex justify-content-start col-md-12">
                              <div className="col-md-8 p-0">
                                <div className="form-group row col-md-12">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.label}
                                    onChange={this.onChangeLabel}
                                    placeholder="Label to Identify Valuation"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 p-0">
                                <div className="form-group pr-2">
                                  <input
                                    type="submit"
                                    value="Confirm"
                                    className="btn btn-primary pr-2 font-weight-bold"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <button
                            className="btn btn-success mb-2"
                            onClick={this.saveValuation}
                          >
                            <strong>Save Valuation</strong>
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, null)(Analyzer);
