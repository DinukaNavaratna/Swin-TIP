import React, { Component } from "react";
import { connect } from "react-redux";
import "react-notifications/lib/notifications.css";


class Package extends Component {

    render() {
        const { item } = this.props;
        return (
            <div key={item._id}>
                <div className="container rounded-0 border border-info ">
                    <div className="container ">
                        <div className="row">
                            <div className="col-sm">
                                <br />
                                <img
                                    alt="packageImg"
                                    height="80%"
                                    width="100%"
                                    src={`/uploads/${item.imageData}`}
                                />
                                <br />
                            </div>
                            <div className="col-sm">
                                <br />
                                <h4 className="font-weight-bold text-left text-danger mt-4">
                                    {item.packageName}
                                </h4>
                                <h5 className="font-weight-bold text-left text-info">
                                    Monthly Rental : Rs {item.monthlyCharge}.00
                                </h5>
                                <h6 className="font-weight-bold text-left">
                                    Down Payment : Rs {item.downPayment}.00
                                </h6>
                                <h6 className="font-weight-bold text-left">
                                    Type : {item.packageType}
                                </h6>

                            </div>

                            <div className="col-sm">
                                <br />
                                <br />
                                <h6 className="font-weight-bold text-left text-danger mt-3">
                                    Speed : ⬇ {item.downloadSpeed}Mbps ⬆ {item.uploadSpeed}Mbps
                                </h6>
                                <h6 className="font-weight-bold text-left text-primary">
                                    Download Data Limit : {item.downloadLimit} GB
                                </h6>
                                <h6 className="font-weight-bold text-left text-success">
                                    Upload Data Limit : {item.uploadLimit} GB
                                </h6>
                                <p className="font-weight-bold text-left text-warning">
                                    Charge For Extra GB : Rs {item.extraGBFee}.00
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.emp.isAuthenticated,
    emp: state.emp,
});

export default connect(mapStateToProps, null)(Package);
