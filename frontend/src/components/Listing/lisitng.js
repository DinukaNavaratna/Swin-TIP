import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Property from "./propertyListing";

class PropertyListView extends Component {

  state = {
    pager: {},
    pageOfItems: [],
    query : "",
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
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1;
    if (page !== this.state.pager.currentPage) {
      fetch(`${process.env.REACT_APP_BACK_END_URL}/properties/paginate?page=${page}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then(({ pager, pageOfItems }) => {
          this.setState({ pager, pageOfItems });
        });
    }
  };

  setSearch = (e) => {
    this.setState({
      query: e.target.value,
      pager: {},
      pageOfItems: []
    });
  }

  loadSearchPage = (e) => {
    // get page details and items from api
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1;
    if (page !== this.state.pager.currentPage) {
      fetch(`${process.env.REACT_APP_BACK_END_URL}/properties/paginate/search?page=${page}&sitem=${this.state.query}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then(({ pager, pageOfItems }) => {
          this.setState({ pager, pageOfItems });
        });
    }
    this.setState({
      query: ""
    });
  };


  render() {
    return (
      <div className="container">
        <div className="col-md-12 row m-0">
          <div className="col-md-3 p-0 border">
            <h5 className="card-header font-weight-bold pb-3 pt-3">District</h5>
            <br/>
            <p className="pl-3 ml-1 text-primary">Western Province</p>
            <p className="pl-3 ml-1 text-primary">Southern Province</p>
            <p className="pl-3 ml-1 text-primary">Central Province</p>
            <p className="pl-3 ml-1 text-primary">Uva Province</p>
            <p className="pl-3 ml-1 text-primary">Sabaragamuwa Province</p>
            <p className="pl-3 ml-1 text-primary">Northern Province</p>
            <p className="pl-3 ml-1 text-primary">North Western Province</p>
            <p className="pl-3 ml-1 text-primary">Eastern Province</p>
            <p className="pl-3 ml-1 text-primary">North Central Province</p>

            <h5 className="card-header font-weight-bold pb-3 pt-3">Category</h5>
            <br/>
            <p className="pl-3 ml-1 text-danger">Commercial Land</p>
            <p className="pl-3 ml-1 text-danger">Commercial Building</p>
          </div>
          <div className="col-md-9 p-0 border">
            <div className="card text-center">
              <div className="card-header p-1">

                <form onSubmit={this.loadSearchPage}>
                  <div className="row p-0 m-0 pt-1">

                    <div className='col-sm-10 row p-0 m-0'>
                      <div className="form-group col-sm-12 pb-1 px-1 m-0 pt-0">
                        <input type="text" className="form-control"  value={this.state.query} onChange={this.setSearch} placeholder="Search Keyword"/>
                      </div>
                    </div>


                    <div className='col-sm-2 row p-0 m-0'>
                      <div className='col-sm-12 p-0 m-0 justify-content-start'>
                        <div className="form-group m-0 pt-0 col-sm-12 px-1">
                          <input type="submit" value="Search" className="btn btn-primary pt-1 col-sm-12 px-0"/>
                        </div>
                      </div>
                    </div>

                  </div>


                </form>

              </div>



              <div className="card-body ">
                {this.state.pageOfItems.map((item) => (
                  <>
                    <Property item={item}/>
                  </>
                ))}
              </div>
              <div className="card-footer pb-0 pt-3 pr-0">
                {this.state.pager.pages && this.state.pager.pages.length && (
                  <ul className="pagination">
                    <li
                      className={`page-item first-item ${
                        this.state.pager.currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <Link to={{ search: `?page=1` }} className="page-link">
                        First
                      </Link>
                    </li>

                    <li
                      className={`page-item previous-item ${
                        this.state.pager.currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <Link
                        to={{ search: `?page=${this.state.pager.currentPage - 1}` }}
                        className="page-link"
                      >
                        Previous
                      </Link>
                    </li>

                    {this.state.pager.pages.map((page) => (
                      <li
                        key={page}
                        className={`page-item number-item ${
                          this.state.pager.currentPage === page ? "active" : ""
                        }`}
                      >
                        <Link
                          to={{ search: `?page=${page}` }}
                          className="page-link"
                        >
                          {" "}
                          {page}{" "}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`page-item next-item ${
                        this.state.pager.currentPage === this.state.pager.totalPages ? "disabled" : ""
                      }`}
                    >
                      <Link
                        to={{ search: `?page=${this.state.pager.currentPage + 1}` }}
                        className="page-link"
                      >
                        {" "}
                        Next{" "}
                      </Link>
                    </li>

                    <li
                      className={`page-item last-item ${
                        this.state.pager.currentPage === this.state.pager.totalPages ? "disabled" : ""
                      }`}
                    >
                      <Link
                        to={{ search: `?page=${this.state.pager.totalPages}` }}
                        className="page-link"
                      >
                        Last
                      </Link>
                    </li>
                  </ul>
                )}
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
