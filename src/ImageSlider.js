import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 
const ImageSlider = ({ images }) => {
   
 
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
 
    // Rest of the component...
 
 
 
  // Check if 'images' is defined and is an array
  if (!images || !Array.isArray(images) || images.length === 0) {
    // Return some placeholder content or an error message
    return <p>No images to display.</p>;
  }
 
  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};
 
export default ImageSlider;