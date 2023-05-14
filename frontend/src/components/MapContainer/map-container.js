import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-notifications/lib/notifications.css';
import { Button, Modal } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { GoogleMapComponent } from '../GoogleMap/google-map';
import './map-container.css';
import Property from "../Listing/propertyListing";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.onChangeBeachAccess = this.onChangeBeachAccess.bind(this);
    this.onChangePrivateBeach = this.onChangePrivateBeach.bind(this);
    this.onChangeStarGrade = this.onChangeStarGrade.bind(this);
    this.onChangeTaxi = this.onChangeTaxi.bind(this);
    this.onChangeAirportShuttle = this.onChangeAirportShuttle.bind(this);
    this.onChangeWheelChair = this.onChangeWheelChair.bind(this);

    this.state = {
      isMarkerShown: false,
      isOpenModal: this.props.isOpenModal,
      beachAccess: '',
      privateBeach: '',
      starGrade: '',
      taxi: '',
      wheelChair: '',
      airportShuttle: '',
      selectedProperty: null,
      adModal: false,
    };
  }

  openModal = () => this.setState({ isOpenModal: true });
  closeModal = () => this.setState({ isOpenModal: false });

  openAdModal = () => this.setState({ adModal: true });
  closeAdModal = () => this.setState({ adModal: false });

  loadSelectedProperty = (ref) => {
    this.setState({
      selectedProperty: ref,
    });
  };

  onChangeBeachAccess(e) {
    this.setState({ beachAccess: e.target.value }, () => {
      // console.log(this.state.beachAccess);
    });
  }

  onChangePrivateBeach(e) {
    this.setState({ privateBeach: e.target.value });
  }

  onChangeStarGrade(e) {
    this.setState({ starGrade: e.target.value });
  }

  onChangeTaxi(e) {
    this.setState({ taxi: e.target.value });
  }

  onChangeAirportShuttle(e) {
    this.setState({ airportShuttle: e.target.value });
  }

  onChangeWheelChair(e) {
    this.setState({ wheelChair: e.target.value });
  }

  analyze = () => {
    this.setState({ isOpenModal: false });
    this.props.openScreen();

    this.props.loadRequiredDetails({
      beachAccess: this.state.beachAccess,
      privateBeach: this.state.privateBeach,
      starGrade: this.state.starGrade,
      taxi: Number(this.state.taxi.toString().slice(-1)),
      wheelChair: Number(this.state.wheelChair.toString().slice(-1)),
      airportShuttle: Number(this.state.airportShuttle.toString().slice(-1)),
    });
  };

  render() {
    return (
      <div>
        <Modal
          show={this.state.isOpenModal}
          onHide={this.closeModal}
          centered
          contentClassName="landval-pop-up-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Find Optimum Place for Your Hotel</Modal.Title>
          </Modal.Header>

          <Modal.Body className={'landval-body-container'}>
            <div className={'landval-row'}>
              <div className={'landval-column-1'}>
                <label> Beach Access : </label>
              </div>
              <div className={'landval-column-2'}>
                <Select
                  className={'landval-dropdown'}
                  labelId="rp-beach-access-label"
                  id="rp-beach-access"
                  value={this.state.beachAccess}
                  onChange={this.onChangeBeachAccess}
                >
                  <MenuItem value={'Beachfront'}>Beach Front</MenuItem>
                  <MenuItem value={'Beach nearby'}>Beach Nearby</MenuItem>
                  <MenuItem value={'Beach distant'}>Beach Distant</MenuItem>
                </Select>
              </div>
            </div>

            <div className="landval-row">
              <div className="landval-column-1">
                <label> Private Beach : </label>
              </div>
              <div className="landval-column-2">
                <Select
                  labelId="rp-private-beach-label"
                  id="rp-private-beach"
                  value={this.state.privateBeach}
                  onChange={this.onChangePrivateBeach}
                  className={'landval-dropdown'}
                >
                  <MenuItem value={1}> Yes </MenuItem>
                  <MenuItem value={0}> No </MenuItem>
                </Select>
              </div>
            </div>

            <div className="landval-row">
              <div className="landval-column-1">
                <label> Star Grade : </label>
              </div>
              <div className="landval-column-2">
                <Select
                  labelId="rp-star-grade-label"
                  id="rp-star-grade"
                  value={this.state.starGrade}
                  onChange={this.onChangeStarGrade}
                  className={'landval-dropdown'}
                >
                  <MenuItem value={1}> 1 Star Hotel </MenuItem>
                  <MenuItem value={2}> 2 Star Hotel </MenuItem>
                  <MenuItem value={3}> 3 Star Hotel </MenuItem>
                  <MenuItem value={4}> 4 Star Hotel </MenuItem>
                  <MenuItem value={5}> 5 Star Hotel </MenuItem>
                </Select>
              </div>
            </div>

            <div className="landval-row">
              <div className="landval-column-1">
                <label> Availability of Taxi : </label>
              </div>
              <div className="landval-column-2">
                <Select
                  labelId="rp-taxi-label"
                  id="rp-taxi"
                  value={this.state.taxi}
                  onChange={this.onChangeTaxi}
                  className={'landval-dropdown'}
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={10}>Not Decided</MenuItem>
                </Select>
              </div>
            </div>

            <div className="landval-row">
              <div className="landval-column-1">
                <label> Availability of Airport Shuttle : </label>
              </div>
              <div className="landval-column-2">
                <Select
                  labelId="rp-airport-shuttle"
                  id="rp-airport-shuttle"
                  value={this.state.airportShuttle}
                  onChange={this.onChangeAirportShuttle}
                  className={'landval-dropdown'}
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={10}>Not Decided</MenuItem>
                </Select>
              </div>
            </div>

            <div className="landval-row">
              <div className="landval-column-1">
                <label> Wheel Chair Accessible : </label>
              </div>
              <div className="landval-column-2">
                <Select
                  labelId="rp-wheel-chair"
                  id="rp-wheel-chair"
                  value={this.state.wheelChair}
                  onChange={this.onChangeWheelChair}
                  className={'landval-dropdown'}
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={10}>Not Decided</MenuItem>
                </Select>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="analyze-button" onClick={this.analyze}>
              Analyze
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal
          show={this.state.adModal}
          onHide={this.closeAdModal}
          centered
          contentClassName="landval-pop-up-modal"
        >
          <br/>
          <Modal.Body className={'landval-body-container'}>
            <Property item={this.state.selectedProperty}/>
          </Modal.Body>
        </Modal>


        <GoogleMapComponent
          isMarkerShown={true}
          openModal={() => this.openModal()}
          openAdModal={() => this.openAdModal()}
          loadCoordinates={(lt, lg) => this.props.loadCoordinates(lt, lg)}
          loadSelectedProperty={(ref) => this.loadSelectedProperty(ref)}
          lat={this.props.lat}
          long={this.props.long}
          listing={this.props.listing}
        />
      </div>
    );
  }
}

export default connect(null, null)(MapContainer);
