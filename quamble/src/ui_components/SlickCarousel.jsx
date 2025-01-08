import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://via.placeholder.com/600x400",
  "https://via.placeholder.com/600x400/FF0000/FFFFFF",
  "https://via.placeholder.com/600x400/00FF00/FFFFFF",
  "https://via.placeholder.com/600x400/0000FF/FFFFFF",
  "https://via.placeholder.com/600x400/FFFF00/000000",
];

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 cursor-pointer w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center"
    onClick={onClick}
  >
    <FaChevronLeft className="text-white w-4 h-4" />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 cursor-pointer w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center"
    onClick={onClick}
  >
    <FaChevronRight className="text-white w-4 h-4" />
  </div>
);


const AutoplayCarousel = () => {
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    dots: true,
    arrows: true, // Enable arrows
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />, // Custom Previous Arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="relative max-w-7xl mx-auto py-10 px-4">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoplayCarousel;
