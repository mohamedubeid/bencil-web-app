import SimpleImageSlider from 'react-simple-image-slider';
import classes from './ImageSlider.module.css';
const images = [{ url: '/images/test1.png' }, { url: '/images/test2.png' }, { url: '/images/test3.png' }];
const ImageSlider = () => {
  return (
    <div className={classes.outer_container}>
      <div className={classes.slider_container}>
        <SimpleImageSlider
          width="100%"
          height="100%"
          images={images}
          showBullets={true}
          slideDuration={1.5}
          loop={true}
          autoPlay={true}
          autoPlayDelay={5}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
