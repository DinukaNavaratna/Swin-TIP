import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Button, Card, Modal, Tabs, Tab, Carousel } from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import LocalCafeOutlinedIcon from '@material-ui/icons/LocalCafeOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import './score-card.css';
import { dummyData } from './dummyData';
import { dummyDataFull } from './dummyDataFull';
import StarHalfOutlinedIcon from '@material-ui/icons/StarHalfOutlined';
import FlareOutlinedIcon from '@material-ui/icons/FlareOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@material-ui/icons/TrendingDownOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import HotelIcon from '@material-ui/icons/Hotel';
import RateReviewIcon from '@material-ui/icons/RateReview';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import axios from 'axios';

class scoreCard extends Component {
  state = {
    isOpenScoreModal: false,
    scoreModalType: '',
    isSentimentShow: false,
    sentiment: '',
  };

  openScoreModal = () => this.setState({ isOpenScoreModal: true });
  closeScoreModal = () => this.setState({ isOpenScoreModal: false });

  setModalType = (type) => {
    this.setState({ scoreModalType: type });
    this.openScoreModal();
  };

  getSentiment = async (reviewsParameter) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/predictions/reviewSentiment`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          reviews: reviewsParameter,
        }),
      }
    );

    const data = await res.json();
    console.log(data);

    this.setState({ isSentimentShow: true });
    this.setState({ sentiment: data });
  };

  renderScoreCardModal(modalName, data) {
    let tablist = [];

    for (const [key, value] of data) {
      switch (value[1]) {
        case 'layout1':
          tablist.push(this.renderTabLayout1(key, value[0]));
          break;
        case 'layout2':
          tablist.push(this.renderTabLayout2(key, value[0]));
          break;
        case 'layout3':
          tablist.push(this.renderTabLayout3(key, value[0]));
          break;
      }
    }

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>

        <Tabs
          defaultActiveKey={Object.keys(data)[0]}
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          {tablist}
        </Tabs>
      </div>
    );
  }

  renderTabLayout1(tabName, data) {
    return (
      <Tab eventKey={tabName} title={tabName}>
        {data.map((item, index) => {
          return (
            <div style={{ margin: '10px' }} key={index}>
              <Card style={{}}>
                <Carousel>
                  {item.photos ? (
                    item.photos.map((photo, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_API_KEY}`}
                          ></img>
                        </Carousel.Item>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Carousel>
                <Card.Body>
                  <Card.Title> {item.name} </Card.Title>
                  <Card.Text>
                    <div>{`Total User Reviews : ${item.user_ratings_total}`}</div>
                    <div>{`Rating : ${item.rating}`}</div>
                    <div>Latest 5 Reviews : </div>
                    <div style={{ marginTop: '10px' }}>
                      {item.reviews ? (
                        item.reviews.map((review, index) => {
                          return (
                            <div style={{ marginTop: '5px' }} key={index}>
                              * {review.text}
                            </div>
                          );
                        })
                      ) : (
                        <div> No reviews </div>
                      )}
                    </div>
                  </Card.Text>
                  <Button variant="primary" style={{marginRight: "10px"}} onClick={() => window.open( 'http://www.google.com')}>Search more</Button>
                  <Button onClick={() => {this.getSentiment(item.reviews)}}>View Sentiment</Button>
                  {
                    this.state.isSentimentShow &&
                      <div style={{marginTop: "15px"}}>
                        <h6>Positive Reviews Percentage : {this.state.sentiment.positive_review}%</h6>
                        <h6>Neutral Reviews Percentage : {this.state.sentiment.neutral_review}%</h6>
                        <h6>Negative Reviews Percentage: {this.state.sentiment.negative_review}%</h6>
                      </div>
                  }
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Tab>
    );
  }

  renderTabLayout2(tabName, data) {
    return (
      <Tab eventKey={tabName} title={tabName}>
        {data.map((item, index) => {
          return (
            <div className="v1-row" key={index}>
              <div className="v1-column image-column">
                {item.photos != null && item.photos.length != 0 ? (
                  <>
                    {' '}
                    <Card.Img
                      variant="top"
                      src={
                        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${item.photos[0].photo_reference}&key=${process.env.REACT_APP_API_KEY}` ||
                        `images/NO_IMG.png`
                      }
                    />{' '}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="v1-column description-column">
                <Card.Body>
                  <Card.Title> {item.name} </Card.Title>
                  <Card.Text>
                    <div>{`Total User Reviews : ${item.user_ratings_total}`}</div>
                    <div>{`Rating : ${item.rating}`}</div>
                  </Card.Text>
                  <Button variant="primary" onClick={() => window.open( 'http://www.google.com')}>Search more</Button>
                </Card.Body>
              </div>
            </div>
          );
        })}
      </Tab>
    );
  }

  renderTabLayout3(tabName, data) {
    return (
      <Tab eventKey={tabName} title={tabName}>
        {data.map((item, index) => {
          return (
            <div className="v1-row" key={index}>
              <div className="v1-column image-column">
                {item.photos != null && item.photos.length != 0 ? (
                  <>
                    {' '}
                    <Card.Img
                      variant="top"
                      src={
                        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${item.photos[0].photo_reference}&key=${process.env.REACT_APP_API_KEY}` ||
                        `../../images/NO_IMG.png`
                      }
                    />{' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <Card.Img
                      variant="top"
                      src={`../../images/NO_IMG.png`}
                    />{' '}
                  </>
                )}
              </div>
              <div className="v1-column description-column">
                <Card.Body>
                  <Card.Title> {item.name} </Card.Title>
                  <Card.Text>
                    {/*<div>{`Total User Reviews : ${item.user_ratings_total}`}</div>*/}
                    {/*<div>{`Rating : ${item.rating}`}</div>*/}
                  </Card.Text>
                  <Button variant="primary" onClick={() => window.open( 'http://www.google.com')}>Search more</Button>
                </Card.Body>
              </div>
            </div>
          );
        })}
      </Tab>
    );
  }

  render() {
    // popularity data
    let popularityData = new Map();
    popularityData.set('Nearest 20 Hotels', [
      this.props.popularity.nearest20Hotels,
      'layout1',
    ]);
    popularityData.set('Competitors', [
      this.props.popularity.sameGradeHotels,
      'layout2',
    ]);

    // accessibility data
    let accessibilityData = new Map();
    accessibilityData.set('Parking Areas', [
      this.props.accessibility.locations.parking,
      'layout3',
    ]);
    accessibilityData.set('Transit Hubs', [
      this.props.accessibility.locations.transitStation,
      'layout3',
    ]);

    // attraction data
    let attractionData = new Map();
    attractionData.set('Restaurants', [
      this.props.attraction.coastalPlaces.restaurants,
      'layout3',
    ]);
    attractionData.set('Cafes', [
      this.props.attraction.coastalPlaces.cafes,
      'layout3',
    ]);
    attractionData.set('ATMs', [
      this.props.attraction.coastalPlaces.atms,
      'layout3',
    ]);

    let demandData = new Map();

    return (
      <div className="col-md-12 row p-0 m-0">
        <div
          className="col-md-3 my-3"
          onClick={() => this.setModalType('attraction')}
        >
          <div className="card score-card">
            <div className="px-5 pt-3">
              <CircularProgressbar
                value={this.props.attraction.scoreCard}
                text={`${this.props.attraction.scoreCard}%`}
                styles={buildStyles({
                  // Colors
                  pathColor: '#ff7900',
                  textColor: '#ff7900',
                })}
              />
            </div>
            <br />

            <div className="card-body pt-0">
              <h5 className="card-title text-center">Attraction</h5>
              <Chip
                className="chip"
                label={`Location Rating:  ${this.props.attraction.rating}`}
                variant="outlined"
                color="primary"
                icon={<StarBorderOutlinedIcon />}
              />
              <Chip
                className="chip"
                label={`Restaurants:  ${this.props.attraction.restaurants}`}
                variant="outlined"
                color="primary"
                icon={<RestaurantOutlinedIcon />}
              />

              <Chip
                className="chip"
                label={`Cafes:  ${this.props.attraction.cafes}`}
                variant="outlined"
                color="primary"
                icon={<LocalCafeOutlinedIcon />}
              />

              <Chip
                className="chip"
                label={`ATMs:  ${this.props.attraction.atms}`}
                variant="outlined"
                color="primary"
                icon={<LocalAtmOutlinedIcon />}
              />
              <Chip
                className="chip"
                label={`City Center:  ${this.props.attraction.cityCenter} km`}
                variant="outlined"
                color="primary"
                icon={<LocationCityOutlinedIcon />}
              />
            </div>
          </div>
        </div>
        <div
          className="col-md-3 my-3"
          onClick={() => this.setModalType('accessibility')}
        >
          <div className="card score-card">
            <div className="px-5 pt-3">
              <CircularProgressbar
                value={this.props.accessibility.score}
                text={`${this.props.accessibility.score}%`}
                styles={buildStyles({
                  // Colors
                  pathColor: '#0066ff',
                  textColor: '#0066ff',
                })}
              />
            </div>
            <br />
            <div className="card-body pt-0">
              <h5 className="card-title text-center">Accessibility</h5>
              <Chip
                className="chip"
                label={`Accessibility Rating:  ${this.props.accessibility.rating}`}
                variant="outlined"
                color="primary"
                icon={<StarBorderOutlinedIcon />}
              />
              <Chip
                className="chip"
                label={`Transport Hubs:  ${this.props.accessibility.transportHubs}`}
                variant="outlined"
                color="primary"
                icon={<DirectionsBusIcon />}
              />

              <Chip
                className="chip"
                label={`Parking Zones:  ${this.props.accessibility.parking}`}
                variant="outlined"
                color="primary"
                icon={<LocalParkingIcon />}
              />

              <Chip
                className="chip"
                label={`Gas Stations:  ${this.props.accessibility.gasStation}`}
                variant="outlined"
                color="primary"
                icon={<LocalGasStationIcon />}
              />
              <Chip
                className="chip"
                label={`City Center:  ${this.props.accessibility.cityCenter} km`}
                variant="outlined"
                color="primary"
                icon={<LocationCityOutlinedIcon />}
              />
            </div>
          </div>
        </div>
        <div
          className="col-md-3 my-3"
          onClick={() => this.setModalType('competition')}
        >
          <div className="card score-card">
            <div className="px-5 pt-3">
              <CircularProgressbar
                value={this.props.popularity.predictionValue.popularity_level}
                text={`${this.props.popularity.predictionValue.popularity_level}%`}
                styles={buildStyles({
                  // Colors
                  pathColor: '#00cc00',
                  textColor: '#00cc00',
                })}
              />
            </div>
            <br />
            <div className="card-body pt-0">
              <h5 className="card-title text-center">Popularity</h5>
              <Chip
                className="chip"
                label={`Review Count: ${this.props.popularity.neighborhoodReviews}`}
                variant="outlined"
                color="primary"
                icon={<RateReviewIcon />}
              />
              <Chip
                className="chip"
                label={`Nearby Hotels: ${this.props.popularity.nearest20Hotels.length}`}
                variant="outlined"
                color="primary"
                icon={<HotelIcon />}
              />
              <Chip
                className="chip"
                label={`Competitors: ${this.props.popularity.sameGradeHotels.length}`}
                variant="outlined"
                color="primary"
                icon={<HotelIcon />}
              />
              <Chip
                className="chip"
                label={`Budget Hotels: ${Math.floor(Math.random() * 20)}`}
                variant="outlined"
                color="primary"
                icon={<MoneyOffIcon />}
              />
              <Chip
                className="chip"
                label={`Luxury Hotels: ${Math.floor(Math.random() * 5)}`}
                variant="outlined"
                color="primary"
                icon={<MonetizationOnIcon />}
              />
            </div>
          </div>
        </div>

        <div
          className="col-md-3 my-3"
          onClick={() => this.setModalType('demand')}
        >
          <div className="card score-card">
            <div className="px-5 pt-3">
              <CircularProgressbar
                value={this.props.demand.data.demand_score}
                text={`${this.props.demand.data.demand_score}%`}
                styles={buildStyles({
                  // Colors
                  pathColor: '#85141f',
                  textColor: '#85141f',
                })}
              />
            </div>
            <br />
            <div className="card-body pt-0">
              <h5 className="card-title text-center">Demand</h5>
              <Chip
                className="chip"
                label={`Max Demand:${this.props.demand.data.max_demand}`}
                variant="outlined"
                color="primary"
                icon={<StarOutlinedIcon />}
              />
              <Chip
                className="chip"
                label={`Max Check-ins: ${this.props.demand.data.max_checkings}`}
                variant="outlined"
                color="primary"
                icon={<TrendingUpOutlinedIcon />}
              />
              <Chip
                className="chip"
                label={`Min Demand: ${this.props.demand.data.min_demand}`}
                variant="outlined"
                color="primary"
                icon={<StarHalfOutlinedIcon />}
              />
              <Chip
                className="chip"
                label={`Min Check-ins: ${this.props.demand.data.min_checkings}`}
                variant="outlined"
                color="primary"
                icon={<TrendingDownOutlinedIcon />}
              />
              <Chip
                className="chip"
                label={`Avg Check-ins: ${this.props.demand.data.avg_demand}`}
                variant="outlined"
                color="primary"
                icon={<FlareOutlinedIcon />}
              />
            </div>
          </div>
        </div>

        {/*Modal begins*/}
        <Modal
          show={this.state.isOpenScoreModal}
          onHide={this.closeScoreModal}
          centered
          contentClassName="pop-up-modal"
          size="lg"
          dialogClassName="modalA"
        >
          {console.log(this.state.scoreModalType)}

          {(() => {
            switch (this.state.scoreModalType.toString()) {
              case 'attraction':
                return this.renderScoreCardModal(
                  'Location Attraction',
                  attractionData
                );
              case 'accessibility':
                return this.renderScoreCardModal(
                  'Location Accessibility',
                  accessibilityData
                );
              case 'competition':
                return this.renderScoreCardModal(
                  'Location Popularity',
                  popularityData
                );
              case 'demand':
                return this.renderScoreCardModal(
                  'Location Demand',
                  popularityData
                );
              default:
                return <></>;
            }
          })()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, null)(scoreCard);
