import React from "react";
import Carousel from "react-material-ui-carousel";
import "./Banner.scss";
const data = [
  "https://m.media-amazon.com/images/I/61FR4hEcNLL._SX3000_.jpg",
  " https://m.media-amazon.com/images/I/61NOtf7KUSL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71m5s4DCkfL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/51evwsrtwpL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61Jz8RKQALL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61Pdz+-vnsL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71DQMiLiGZL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71LwSEwCyfL._SX3000_.jpg",
];
function Banner() {
  return (
    <Carousel
      className="carousel"
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
        style: {
          backgroundColor: "#fff",
          color: "#494949",
          borderRadius: 0,
              marginTop: -300,
          height:"90px"
        },
      }}
    >
      {data.map((item, i) => {
        return (
          <>
            <img src={item} alt="" key={i} className="banner_img" />
          </>
        );
      })}
    </Carousel>
  );
}

export default Banner;
