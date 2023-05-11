import React, { Component } from 'react';
import axios from 'axios';
import DefaultImg from '../assets/default-img.jpg';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import disableBrowserBackButton from 'disable-browser-back-navigation';
import Alert from '@material-ui/lab/Alert';
import Login from '../LoginLogoutRegister/login';
import LinearIndeterminate from '../LinearIndeterminate/progressBar';

class PostAd extends Component {
  state = {
    title: '',
    propertyType: '',
    region: '',
    sizeType: '',
    size: '',
    addr: '',
    des: '',
    price: '',
    contactNum: '',
    valuation: '',
    beachType: '',
    pvtBeach: '',
    wheelChair: '0',
    starGrade: '1',
    multipleFiles: '',
    progress: false,
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    disableBrowserBackButton();
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onChangePropertyType = (e) => {
    this.setState({
      propertyType: e.target.value,
    });
    if (e.target.value === 'Commercial Land') {
      this.setState({
        wheelChair: '0',
        starGrade: '1',
      });
    }
  };

  onChangeRegion = (e) => {
    this.setState({
      region: e.target.value,
    });
  };

  onChangeSizeType = (e) => {
    this.setState({
      sizeType: e.target.value,
    });
  };

  onChangeSize = (e) => {
    this.setState({
      size: e.target.value,
    });
  };

  onChangeAddr = (e) => {
    this.setState({
      addr: e.target.value,
    });
  };

  onChangePrice = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  onChangeDes = (e) => {
    this.setState({
      des: e.target.value,
    });
  };

  onChangeValuation = (e) => {
    this.setState({
      valuation: e.target.value,
    });
  };

  onChangeBeachType = (e) => {
    this.setState({
      beachType: e.target.value,
    });
  };

  onChangePvtBeach = (e) => {
    this.setState({
      pvtBeach: e.target.value,
    });
  };

  onChangeWheelChair = (e) => {
    this.setState({
      wheelChair: e.target.value,
    });
  };

  onChangeStarGrade = (e) => {
    this.setState({
      starGrade: e.target.value,
    });
  };

  onChangeContactNum = (e) => {
    this.setState({
      contactNum: e.target.value,
    });
  };

  MultipleFileChange = (e) => {
    this.setState({
      multipleFiles: e.target.files,
      multipleProgress: 0,
    });
  };

  mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      this.setState({
        multipleProgress: percentage,
      });
    },
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.multipleFiles.length === 3) {
      this.setState({
        progress: true,
      });
      let imageFormObj = new FormData();
      imageFormObj.append('title', this.state.title);
      imageFormObj.append('username', this.props.user.user.uName);
      imageFormObj.append('propertyType', this.state.propertyType);
      imageFormObj.append('region', this.state.region);
      imageFormObj.append('sizeType', this.state.sizeType);
      imageFormObj.append('size', this.state.size);
      imageFormObj.append('addr', this.state.addr);
      imageFormObj.append('des', this.state.des);
      imageFormObj.append('price', this.state.price);
      imageFormObj.append('contactNum', this.state.contactNum);
      imageFormObj.append('valuation', this.state.valuation);
      imageFormObj.append('beachType', this.state.beachType);
      imageFormObj.append('pvtBeach', this.state.pvtBeach);
      imageFormObj.append('starGrade', this.state.starGrade);
      imageFormObj.append('wheelChair', this.state.wheelChair);
      for (let i = 0; i < 3; i++) {
        imageFormObj.append('files', this.state.multipleFiles[i]);
      }

      axios
        .post(
          `${process.env.REACT_APP_BACK_END_URL}/properties/add`,
          imageFormObj
        )
        .then((data) => {
          if (data.data.success) {
            swal('Successful', 'Advertisement Posted', 'success');
            this.props.history.push('/');
          }
          this.setState({
            progress: false,
          });
        })
        .catch((err) => {
          swal('Unsuccessful', 'Advertisement Not Posted', 'error');
          this.setState({
            progress: false,
          });
        });

      this.setState({
        title: '',
        propertyType: '',
        region: '',
        sizeType: '',
        size: '',
        addr: '',
        des: '',
        price: '',
        valuation: '',
        beachType: '',
        contactNum: '',
        pvtBeach: '',
        wheelChair: null,
        starGrade: null,
        multipleFiles: '',
        msg: null,
      });
    } else {
      console.log();
      swal('Unsuccessful', 'Select 3 Photos or Images', 'error');
      this.setState({
        multipleFiles: '',
      });
    }
  };

  render() {
    const { isAuthenticated } = this.props.user;

    return (
      <div>
        {!isAuthenticated ? (
          <Login />
        ) : (
          <div className="container border my-5">
            <div>
              <br />
              <h3>Post Advertisement</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Title :</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                  />
                </div>

                <div className="form-group">
                  <label>Property Type :</label>
                  <div onChange={this.onChangePropertyType}>
                    <input
                      type="radio"
                      value="Commercial Land"
                      name="type1"
                      required
                    />{' '}
                    Commercial Land <br />
                    <input
                      type="radio"
                      value="Commercial Building"
                      name="type1"
                      required
                    />{' '}
                    Commercial Building / Hotel <br />
                  </div>
                </div>

                <div className="form-group">
                  <label>Region :</label>
                  <div onChange={this.onChangeRegion}>
                    <input
                      type="radio"
                      value="Western Province"
                      name="type5"
                      required
                    />{' '}
                    Western Province <br />
                    <input
                      type="radio"
                      value="Southern Province"
                      name="type5"
                      required
                    />{' '}
                    Southern Province <br />
                    <input
                      type="radio"
                      value="Central Province"
                      name="type5"
                      required
                    />{' '}
                    Central Province <br />
                    <input
                      type="radio"
                      value="Uva Province"
                      name="type5"
                      required
                    />{' '}
                    Uva Province <br />
                    <input
                      type="radio"
                      value="Sabaragamuwa Province"
                      name="type5"
                      required
                    />{' '}
                    Sabaragamuwa Province <br />
                    <input
                      type="radio"
                      value="Northern Province"
                      name="type5"
                      required
                    />{' '}
                    Northern Province <br />
                    <input
                      type="radio"
                      value="North Western Province"
                      name="type5"
                      required
                    />{' '}
                    North Western Province <br />
                    <input
                      type="radio"
                      value="Eastern Province"
                      name="type5"
                      required
                    />{' '}
                    Eastern Province <br />
                    <input
                      type="radio"
                      value="North Central Province"
                      name="type5"
                      required
                    />{' '}
                    North Central Province <br />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address :</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={this.state.addr}
                    onChange={this.onChangeAddr}
                  />
                </div>

                <div className="form-group">
                  <label>Contact Number :</label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    value={this.state.contactNum}
                    onChange={this.onChangeContactNum}
                  />
                </div>

                <div className="row p-0 m-0 col-12">
                  <div className="col-6 pl-0">
                    <div className="form-group">
                      <label>Size :</label>
                      <input
                        required
                        type="number"
                        className="form-control"
                        value={this.state.size}
                        onChange={this.onChangeSize}
                      />
                    </div>
                  </div>
                  <div className="col-6 pr-0">
                    <div className="form-group ">
                      <label>Perches / Sqft :</label>
                      <div onChange={this.onChangeSizeType}>
                        <input
                          type="radio"
                          value="Perches"
                          name="type2"
                          required
                        />{' '}
                        Perches <br />
                        <input
                          type="radio"
                          value="Sqft"
                          name="type2"
                          required
                        />{' '}
                        Sqft <br />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Price :</label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                  />
                </div>

                {/*----------------------------------------------------*/}

                {this.state.propertyType === 'Commercial Building' ? (
                  <>
                    <div className="form-group">
                      <label>Star Grade of the Hotel :</label>
                      <div onChange={this.onChangeStarGrade}>
                        <input type="radio" value="1" name="type3" required /> 1
                        Star <br />
                        <input type="radio" value="2" name="type3" required /> 2
                        Star <br />
                        <input type="radio" value="3" name="type3" required /> 3
                        Star <br />
                        <input type="radio" value="4" name="type3" required /> 4
                        Star <br />
                        <input type="radio" value="5" name="type3" required /> 5
                        Star <br />
                        <input
                          type="radio"
                          value="1"
                          name="type3"
                          required
                        />{' '}
                        Not Decided <br />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Wheel Chair Accessibility :</label>
                      <div onChange={this.onChangeWheelChair}>
                        <input type="radio" value="1" name="type4" required />{' '}
                        Yes <br />
                        <input
                          type="radio"
                          value="0"
                          name="type4"
                          required
                        />{' '}
                        No <br />
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="form-group">
                  <label>Beach Type :</label>
                  <div onChange={this.onChangeBeachType}>
                    <input
                      type="radio"
                      value="Beach distant"
                      name="type6"
                      required
                    />{' '}
                    Beach Distant <br />
                    <input
                      type="radio"
                      value="Beach nearby"
                      name="type6"
                      required
                    />{' '}
                    Beach Nearby <br />
                    <input
                      type="radio"
                      value="Beachfront"
                      name="type6"
                      required
                    />{' '}
                    Beach Front <br />
                  </div>
                </div>

                <div className="form-group">
                  <label>Availability of Private Beach :</label>
                  <div onChange={this.onChangePvtBeach}>
                    <input type="radio" value="1" name="type7" required /> Yes{' '}
                    <br />
                    <input
                      type="radio"
                      value="0"
                      name="type7"
                      required
                    /> No <br />
                  </div>
                </div>

                {/*----------------------------------------------------*/}

                <div className="form-group">
                  <label>Description :</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={this.state.des}
                    onChange={this.onChangeDes}
                  />
                </div>

                <div className="form-group">
                  <label>Select Photos (Only 3)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={this.MultipleFileChange}
                    className="form-control"
                    multiple
                  />
                </div>

                <div className="form-group">
                  <label>Display Analyzed Report :</label>
                  <div onChange={this.onChangeValuation}>
                    <input type="radio" value="true" name="type8" required />{' '}
                    Yes <br />
                    <input
                      type="radio"
                      value="false"
                      name="type8"
                      required
                    />{' '}
                    No <br />
                  </div>
                </div>

                <br />

                {this.state.progress ? (
                  <>
                    <LinearIndeterminate />
                    <br />
                  </>
                ) : null}

                <div className="form-group col-12 px-0">
                  <input
                    type="submit"
                    value="Add Details"
                    className="btn btn-primary col-12"
                  />
                </div>
              </form>
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

export default connect(mapStateToProps, null)(PostAd);
