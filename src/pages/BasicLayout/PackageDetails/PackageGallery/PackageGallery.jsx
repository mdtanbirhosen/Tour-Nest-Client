import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import PropTypes from "prop-types";

const PackageGallery = ({ images }) => {
  return (
    <div className=" mx-auto py-8 ">
      <Swiper
        effect={"coverflow"} // Adds the 3D effect
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"} // Displays multiple slides dynamically
        spaceBetween={30} // Adds spacing between slides
        loop={true} // Enables infinite looping
        autoplay={{
          delay: 3000, // 3-second autoplay delay
          disableOnInteraction: false, // Keeps autoplay running after user interaction
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true, // Enables clickable dots for pagination
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div>
            <img
              src={image}
              alt={`Package Image ${index + 1}`}
              className="rounded-lg shadow-lg object-cover w-full h-[300px] md:h-[400px] lg:h-[500px]"
            />
            <div className="bg-black bg-opacity-40 inset-0 absolute rounded-lg"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

PackageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PackageGallery;
