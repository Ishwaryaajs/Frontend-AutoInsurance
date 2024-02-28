import React from 'react';

const ImagesComponent = () => {
  const images = [
    {
      src: 'https://st.redbus.in/Images/99/webreferal.png',
      alt: 'Description of your image',
      className: 'imgItem',
      style: { width: '1200px', height: '90px', cursor: 'pointer' }
    },
    {
      src: 'https://savinghop.in/wp-content/uploads/2016/08/Redbus-Offers.jpg',
      alt: 'Description of your another image',
      className: 'imgItem',
      style: { width: '1200px', height: '250px', cursor: 'pointer', marginTop: '20px' }
    }
  ];

  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.src}
            alt={image.alt}
            className={image.className}
            style={image.style}
          />
        </div>
      ))}
    </div>
  );
}

export default ImagesComponent;
