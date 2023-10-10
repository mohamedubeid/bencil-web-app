import SimpleImageSlider from 'react-simple-image-slider';
import { sliderImages } from '../../config/variables';



const ImageSlider = () => {
  const outerContainerStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  const sliderContainerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };
  return (
    <div style={outerContainerStyles}
    >
      <div style={sliderContainerStyles}>
        <SimpleImageSlider
          width="100%"
          height="100%"
          images={sliderImages}
          showBullets={true}
          slideDuration={1.5}
          loop={true}
          autoPlay={true}
          autoPlayDelay={5}
          showNavs={false}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
