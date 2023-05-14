import React from 'react';

const Carousel = (props) => (
  <div
    id={props.id}
    className={`carousel slide ${props.className}`}
    data-ride="carousel"
  >
    <div className="carousel-inner">{props.children}</div>
  </div>
);

export default Carousel;
