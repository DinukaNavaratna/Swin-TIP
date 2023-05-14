import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapComponent from '../MapContainer/map-container';
import ScoreComponent from '../ScoreCard/score-card';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';
import DemandForecasting from '../DemandForecasting';
import LinearIndeterminate from '../LinearIndeterminate/progressBar';

class customAnalyzer extends Component {
  state = {
    pager: {},
    pageOfItems: [],
    lat: null,
    long: null,
    isOpenModal: true,
    scoreScreen: false,
    attraction: null,
    accessibility: null,
    popularity: null,
    progress: false,
  };

  componentDidMount() {
    let latLong = this.props.match.params.coordinates.split('-');
    this.loadCoordinates(latLong[0], latLong[1]);
  }

  componentDidUpdate() {}

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };

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
        ></MapComponent>

        <div className="container">
          {this.state.progress ? (
            <>
              <br />
              <LinearIndeterminate />
              <br />
            </>
          ) : (
            <>
              {this.state.popularity && (
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

export default connect(mapStateToProps, null)(customAnalyzer);
