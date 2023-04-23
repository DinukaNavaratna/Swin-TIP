import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Package from "./package.component";
import "react-notifications/lib/notifications.css";
import styles from './css/searchPackageList.module.css';




class SearchPackageList extends Component {
    state = {
        pager: {},
        pageOfItems: [],
        query : ""
    };



    static propTypes = {
        isAuthenticated: PropTypes.bool,
        emp: PropTypes.object.isRequired,
    };

    setType = (e) => {
        this.setState({
            query: e,
            pager: {},
            pageOfItems: []
        });
        setTimeout(() => {
            this.loadPage();
        }, 2000)

    }

    setSearch = (e) => {
        this.setState({
            query: e.target.value,
            pager: {},
            pageOfItems: []
        });
    }

    loadPage = () => {
        // get page details and items from api
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get("page")) || 1;
        if (page !== this.state.pager.currentPage && this.state.query !== '') {
            fetch(`http://localhost:5000/api/pac/get/all/paginate/search?page=${page}&sitem=${this.state.query}`, {
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
        const { pager, pageOfItems } = this.state;
        return (
            <div>


                <div style={{height:"50px"}} />
                {/*--------------------------------------------------------------------------------------------------*/}

                <form onSubmit={this.loadPage}>

                    <div className="form-group">
                        <label>Advanced Search (Search by Name or Specialization):</label>
                        <input type="text" className="form-control"  value={this.state.query} onChange={this.setSearch}/>

                    </div>


                    <div className='col-sm-12 row p-0 m-0'>
                        <div className='col-sm-6 p-0 m-0 justify-content-start'>
                            <div className="form-group">
                                <input type="submit" value="Search" className="btn btn-primary"/>
                            </div>
                        </div>
                        <div className='col-sm-6 p-0 m-0 justify-content-end text-right row'>
                            <p className={styles.typeOption} onClick={() => this.setType("4G")}>4G</p><h3> | </h3>
                            <p className={styles.typeOption} onClick={() => this.setType("Fiber")}>Fiber</p><h3> | </h3>
                            <p className={styles.typeOption} onClick={() => this.setType("Broadband")}>Broadband</p>
                        </div>
                    </div>

                </form>
                <br/>

                {/*--------------------------------------------------------------------------------------------------*/}


                <div className="card text-center mx-0">
                    <h3 className="card-header font-weight-bold">Internet Package List</h3>

                    <div className="card-body ">
                        {pageOfItems.map((item) => (
                            <>
                                <Package item={item}/>
                            </>
                        ))}
                    </div>
                    <div className="card-footer pb-0 pt-3">
                        {pager.pages && pager.pages.length && (
                            <ul className="pagination">
                                <li
                                    className={`page-item first-item ${
                                        pager.currentPage === 1 ? "disabled" : ""
                                    }`}
                                >
                                    <Link to={{ search: `?page=1` }} className="page-link">
                                        First
                                    </Link>
                                </li>

                                <li
                                    className={`page-item previous-item ${
                                        pager.currentPage === 1 ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.currentPage - 1}` }}
                                        className="page-link"
                                    >
                                        Previous
                                    </Link>
                                </li>

                                {pager.pages.map((page) => (
                                    <li
                                        key={page}
                                        className={`page-item number-item ${
                                            pager.currentPage === page ? "active" : ""
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
                                        pager.currentPage === pager.totalPages ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.currentPage + 1}` }}
                                        className="page-link"
                                    >
                                        {" "}
                                        Next{" "}
                                    </Link>
                                </li>

                                <li
                                    className={`page-item last-item ${
                                        pager.currentPage === pager.totalPages ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.totalPages}` }}
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
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.emp.isAuthenticated,
    emp: state.emp,
});

export default connect(mapStateToProps, null)(SearchPackageList);
