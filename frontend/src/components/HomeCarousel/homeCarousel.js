import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

class HomeCarousel extends Component {
  render() {
    return (
      <Carousel
        autoPlay={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src="../../images/banner/banner1.jpg" />
        </div>
        <div>
          <img src="../../images/banner/banner3.jpg" />
        </div>
        <div>
          <img src="../../images/banner/banner2.jpg" />
        </div>
      </Carousel>
    );
  }
}

export default HomeCarousel;
