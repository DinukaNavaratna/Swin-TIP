import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export class Help extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-dark">Frequently Asked Questions</h2>

        <Accordion className="mt-5 mb-5">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <AddCircleOutlineIcon /> What services do you offer?
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {' '}
                <i>
                  We provide location analytics for hotel site selection,
                  commercial real estate listings and an information portal to
                  query government guidelines
                </i>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <AddCircleOutlineIcon /> Why is hotel location important?
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {' '}
                <i>
                  A superior hotel location has been linked to greater demand,
                  higher pricing per room and better valuation
                </i>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <AddCircleOutlineIcon /> How do you rate a given location?
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="2">
              <Card.Body>
                {' '}
                <i>
                  We rate a hypothetical hotel location under location
                  attraction, accessibility, popularity and provide a demand
                  forecast for the region
                </i>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              <AddCircleOutlineIcon /> How is location attraction calculated?
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="3">
              <Card.Body>
                {' '}
                <i>
                  The surrounding location is analysed to collect data on
                  restaurants, cafes, beaches, distance to main attractions etc.
                  This data is fed to our novel algorithm to predict what rating
                  a user would provide for a hypothetical hotel in that
                  location.
                </i>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
              <AddCircleOutlineIcon /> How is location accessibility measured?
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="4">
              <Card.Body>
                {' '}
                <i>
                  The surrounding location is analysed to collect data on nearby
                  public transport hubs and distance to city center. This data
                  is fed to our novel algorithm to predict the accessibility
                  rating for a hypothetical hotel in that location.
                </i>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="5">
              <AddCircleOutlineIcon /> How is location popularity measured?
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="5">
              <Card.Body>
                {' '}
                <i>
                  The surrounding hotels are analyzed to determine how popular a
                  new hotel would be in that hypothetical location. Popularity
                  is measured by number of reviews received normalized based on
                  hotel type.
                </i>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default Help;
