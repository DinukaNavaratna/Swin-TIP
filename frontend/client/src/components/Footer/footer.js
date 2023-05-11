import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconTelephone } from 'bootstrap-icons/icons/telephone.svg';
import { ReactComponent as IconEnvelope } from 'bootstrap-icons/icons/envelope.svg';
import { ReactComponent as IconFacebook } from 'bootstrap-icons/icons/facebook.svg';
import { ReactComponent as IconYoutube } from 'bootstrap-icons/icons/youtube.svg';

const Footer = () => (
  <>
    <footer>
      <div className="container-fluid bg-dark text-white">
        <div className="row ">
          <div className="col-md-3 py-3">
            <div className="h6">LandVal</div>
            <hr />
            <p>
              A Data-driven Online Decision Support System for​ Hotel Site
              Selection and Investment. We Provide Services by Analysing the
              Hotel Location and Identifying the Factors Contributing to a
              Superior Location, Finding Available Land Plots for Developments
              and Referring Complicated Government Documents for Guidelines and
              Regulations.
            </p>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Services</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/analyzer"
                  className="text-decoration-none text-white stretched-link"
                >
                  Valuator
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/listing"
                  className="text-decoration-none text-white stretched-link"
                >
                  Listing
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/postAd"
                  className="text-decoration-none text-white stretched-link"
                >
                  Post Ad
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/infoPortal"
                  className="text-decoration-none text-white stretched-link"
                >
                  Info Portal
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/register"
                  className="text-decoration-none text-white stretched-link"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Other</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/about"
                  className="text-decoration-none text-white stretched-link"
                >
                  About Us
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/contact"
                  className="text-decoration-none text-white stretched-link"
                >
                  Contact Us
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/help"
                  className="text-decoration-none text-white stretched-link"
                >
                  Help
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/privacy"
                  className="text-decoration-none text-white stretched-link"
                >
                  Privacy
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/terms"
                  className="text-decoration-none text-white stretched-link"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Contact Info</div>
            <hr />
            <address>
              <strong>Land Val.</strong>
              <br />
              1355 Market St, Suite 900,
              <br />
              Sri Lanka
              <br />
            </address>
            <IconTelephone /> +94 773265975
            <br />
            <IconEnvelope /> landval@gmail.com
            <br />
            <ul className="list-group">
              <li className="list-group-item bg-dark text-white border-0 p-0 m-0">
                <Link
                  to="/facebook"
                  className="text-decoration-none text-white stretched-link"
                >
                  <IconFacebook /> facebook
                </Link>
              </li>
              <li className="list-group-item bg-dark text-white border-0 p-0 m-0">
                <Link
                  to="/youtube"
                  className="text-decoration-none text-white stretched-link"
                >
                  <IconYoutube /> youtube
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </>
);
export default Footer;
