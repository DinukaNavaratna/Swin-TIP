import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Property from './propertyListing';

class PropertyListView extends Component {
  state = {
    response: '',
    vacancies: [],
    query: '',
    loading: false,
  };

  componentDidMount() {
    this.loadPage();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
  };

  loadPage = () => {
    // get page details and items from api
    this.state.loading = true;
    fetch(`${process.env.REACT_APP_BACK_END_URL}/publicvacancies`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(({ response, vacancies }) => {
        this.state.loading = false;
        this.setState({ response, vacancies });
      })
      .catch((err) => {
        this.state.loading = false;
      });
  };

  setSearch = (e) => {
    this.setState({
      query: e.target.value,
      response: '',
      vacancies: [],
    });
  };

  loadSearchPage = (e) => {
    // get page details and items from api
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    if (this.state.vacancies.length > 0) {
      this.state.loading = true;
      fetch(`${process.env.REACT_APP_BACK_END_URL}/publicvacancies`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then(({ response, vacancies }) => {
          this.state.loading = false;
          this.setState({ response, vacancies });
        })
        .catch((err) => {
          this.state.loading = false;
        });
    }
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <div className="container">
        <div className="col-md-12 row m-0">
          <div className="col-md-12 p-0 border">
            <div className="card text-center">
              <div className="card-header p-1">
                <form onSubmit={this.loadSearchPage}>
                  <div className="row p-0 m-0 pt-1">
                    <div className="col-sm-10 row p-0 m-0">
                      <div className="form-group col-sm-12 pb-1 px-1 m-0 pt-0">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.query}
                          onChange={this.setSearch}
                          placeholder="Search Keyword"
                        />
                      </div>
                    </div>

                    <div className="col-sm-2 row p-0 m-0">
                      <div className="col-sm-12 p-0 m-0 justify-content-start">
                        <div className="form-group m-0 pt-0 col-sm-12 px-1">
                          <input
                            type="submit"
                            value="Search"
                            className="btn btn-primary pt-1 col-sm-12 px-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="card-body ">
                {this.state.loading && (
                  <img
                    className="py-2"
                    alt="packageImg"
                    height="60%"
                    width="60%"
                    src={`/images/loading.gif`}
                  />
                )}

                {!this.state.loading &&
                  this.state.vacancies.map((item) => (
                    <>
                      <Property item={item} />
                    </>
                  ))}
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, null)(PropertyListView);
