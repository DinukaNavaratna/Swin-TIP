import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class About extends Component {
  render() {
    return (
      <div className="container mt-5 ">
        <Row>
          <Col>
            <h2>About Us</h2>
            <p>
              Location is one of the fundamental factors that determine hotel
              success. The location, once selected, cannot be changed without a
              significant investment. We aim to identify the location specific
              factors that affect guest location rating of Sri Lankan hotels.
              The factors that affect the location rating have been identified
              and an ensemble learning model has been trained to calculate the
              location score of a hypothetical location. The results show that
              this method can predict location ratings with a significant
              accuracy and the research findings can used by hoteliers and
              investors to improve decision making.
            </p>
            <p>
              We Provide Services by Analysing the Hotel Location and
              Identifying the Factors Contributing to a Superior Location,
              Finding Available Land Plots for Developments and Referring
              Complicated Government Documents for Guidelines and Regulations.
            </p>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Our Team</h3>
            <Row className="mt-3 mb-5">
              <Col>
                <Link to="" className="text-decoration-none text-dark">
                  <Card
                    style={{
                      width: '14rem',
                      minHeight: '16em',
                      maxHeight: '16em',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src="../../images/team/imal.jpg"
                      alt="Profile picture"
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1.2rem' }}>
                        Imal Kumarage
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col>
                <Link to="" className="text-decoration-none text-dark">
                  <Card
                    style={{
                      width: '14rem',
                      minHeight: '16em',
                      maxHeight: '16em',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src="../../images/team/Picture1.jpg"
                      alt="Profile picture"
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1rem' }}>
                        Nuwanga Weerakeshara
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col>
                <Link to="" className="text-decoration-none text-dark">
                  <Card
                    style={{
                      width: '14rem',
                      minHeight: '16em',
                      maxHeight: '16em',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src="../../images/team/thanuja2.jpg"
                      alt="Profile picture"
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1.1rem' }}>
                        Thanuja Chamika
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col>
                <Link to="" className="text-decoration-none text-dark">
                  <Card
                    style={{
                      width: '14rem',
                      minHeight: '16em',
                      maxHeight: '16em',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src="../../images/team/Picture3.jpg"
                      alt="Profile picture"
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: '1.1rem' }}>
                        Heshan Rathnapala
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
