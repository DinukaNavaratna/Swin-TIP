import React from 'react';
import { Link } from 'react-router-dom';

const CardIcon = (props) => (
  <Link to={props.to} className="text-decoration-none">
    <div className="card text-center">
      <div className="card-body">
        {props.children}
        <h6 className="card-title text-capitalize">{props.title}</h6>
        <div className="card-text text-success">{props.text}</div>
      </div>
    </div>
  </Link>
);

export default CardIcon;
