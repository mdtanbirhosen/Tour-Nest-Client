import PropTypes from 'prop-types';

const Slide = ({ bgImage = '', heading = '', description = '' }) => {
  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center">
      <img src={bgImage} className="h-full w-full object-cover" alt="Slide background" />

      <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div>
          <h3 className='text-2xl md:text-3xl px-2'>{heading}</h3>
          <br />
          <p className='text-xs md:text-base '>{description}</p>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
Slide.propTypes = {
  bgImage: PropTypes.string.isRequired, 
  heading: PropTypes.string,              
  description: PropTypes.string,              
};



export default Slide;
