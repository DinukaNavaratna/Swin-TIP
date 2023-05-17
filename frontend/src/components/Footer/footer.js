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
            <div className="h6">CorpU University</div>
            <hr />
            <p>
              CorpU University Is One Of The Leading Accredited Universities in
              Australia That Provide Quality Education To Their Students. CorpU
              University Has Three Campuses Around Australia. One in Perth,
              Another One in Sydney and The Main Campus Located in Center of
              Melbourne.
            </p>
          </div>
          <div className="col-md-3 py-3">
            <div className="h6">Services</div>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark text-white border-light">
                <Link
                  to="/listing"
                  className="text-decoration-none text-white stretched-link"
                >
                  Job Vacancy
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
                  to="/help"
                  className="text-decoration-none text-white stretched-link"
                >
                  Help
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
              <strong>CorpU University</strong>
              <br />
              1355 Market St, Melbourne,
              <br />
              Victoria
              <br />
            </address>
            <IconTelephone /> +61 455125555
            <br />
            <IconEnvelope /> info@corpu.edu.au
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
