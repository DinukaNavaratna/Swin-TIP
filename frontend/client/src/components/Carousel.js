import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src:
      "/images/slide1.jpg",
    altText: "Slide 1",
    key: "1",

  },
  {
    src:
        "/images/slide2.JPG",
    altText: "Slide 2",

    key: "2",
  },
  {
    src:
        "/images/slide3.JPG",
    altText: "Slide 3",
    key: "3",
  },
  {
    src: "/images/slide4.JPG",
    altText: "Slide 4",

    key: "4",
  },
  {
    src:
        "/images/slide5.JPG",
    altText: "Slide 5",
    key: "5",
  },
];

const Carousel = () => (
  <div style={{ margin: "20px" }} className='mt-0'>
    <UncontrolledCarousel controls={false} items={items} />
  </div>
);

export default Carousel;
