import React from 'react';
import { Carousel } from 'antd';

function ImageSlider() {
  return (
    <div className='mb-5' style={{ width: '100%', marginTop: '10px'}}>
      <Carousel autoplay autoplaySpeed={6000} pauseOnHover={false}>
        <div>
          <img
            src="home-cover3.png"
            alt="Image 1"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div>
          <img
            src="home-cover4.png"
            alt="Image 2"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        {/* <div>
          <img
            src="home-cover.png"
            alt="Image 3"
            style={{ width: '100%', height: 'auto' }}
          />
        </div> */}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
