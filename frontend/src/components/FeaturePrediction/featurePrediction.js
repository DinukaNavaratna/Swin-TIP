import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "react-apexcharts";

class FeaturePrediction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                title: {
                    text: `Recommended Regional Hotel Features`,
                },
                chart: {
                    type: 'bar',
                    height: 350,
                    width: window.innerWidth === 1920 ? window.innerWidth / 1.85 : window.innerWidth / 1.42
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                xaxis: {
                    labels: {
                        show: false
                    },
                    dataLabels: {
                        style: {
                            fontSize: "12px",
                            colors: ["#6480de", "#b83b50"],
                        },
                    },
                    categories: ['Comfortable Room', 'Good Food', 'Friendly Staff', 'Beach Access', 'Swimming Pool',
                        'Good Service', 'Nice View', 'Cleanliness', 'Availability of a Buffet', 'Drinks and Beverages'
                    ],
                },
                yaxis: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [1806, 1261, 1249, 769, 574, 547, 501, 444, 362, 297]
                }
            ]
        };
    }


  render() {
    return (<>
        <div className="app">
            <div className="row col-md-12 p-0 m-0">
                <div className="mixed-chart">
                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        width={this.state.options.chart.width}
                    />
                </div>
            </div>
        </div>



        <button className="btn btn-outline-secondary col-md-12 " disabled>

          <strong className="text-danger"> 💡 Tip : </strong>
          <strong className="text-dark">
            These are the most preferred hotel features and their proportional demands by tourists in this region. A hotel can maximize
            their profits by providing these features to their customers.
          </strong>
        </button>
    </>);
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, null)(FeaturePrediction);
