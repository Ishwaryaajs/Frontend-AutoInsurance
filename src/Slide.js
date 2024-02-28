import React from 'react';
import ImageSlider from './ImageSlider';
import './Slide.css';  // Import the CSS file
 
const Slide = () => {
  const images = [
    'https://www.renewbuy.com/sites/default/files/2023-08/Motor%20Insurance%20%282%29.png',
   'https://www.windshieldexperts.com/blog1/wp-content/uploads/2016/05/insurance-1.jpg'
  ];
 
  return (
    <div className="center-container">
      <div className="image-slider">
        <ImageSlider images={images}/>
      </div>
    </div>
  );
};
 
export default Slide;