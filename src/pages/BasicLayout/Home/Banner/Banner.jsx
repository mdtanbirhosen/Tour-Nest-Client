import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination"; // Import Swiper pagination styles
import { Autoplay, Pagination } from "swiper/modules";
import Slide from "./Slide";

const bannerData = [
  {
    bgImage:
      "https://tripjive.com/wp-content/uploads/2024/11/Adventure-sports-in-Coxs-Bazar-768x439.jpg",
    name: "Adventure in Cox's Bazar",
    description:
      "Explore the longest sea beach in the world with a 5-day guided tour.",
  },
  {
    bgImage:
      "https://tripjive.com/wp-content/uploads/2024/11/nature-centric-accommodations-in-Sylhet-1024x585.jpg",
    name: "Serene Sylhet Retreat",
    description:
      "Experience the lush greenery and tea gardens of Sylhet on a 3-day tour.",
  },
  {
    bgImage:
      "https://www.thetouristplace.com/wp-content/uploads/2021/12/Sajek-Valley-Rangamati-view.jpg",
    name: "Romantic Rangamati Escape",
    description:
      "A peaceful 4-day honeymoon trip to the picturesque hills of Rangamati.",
  },
  {
    bgImage:
      "https://tripjive.com/wp-content/uploads/2024/11/landmarks-in-Dhaka-1024x585.jpg",
    name: "Cultural Dhaka Discovery",
    description:
      "Immerse yourself in the history and culture of Dhaka over a 2-day trip.",
  },
  {
    bgImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sundarbans_river.jpg/800px-Sundarbans_river.jpg",
    name: "Wildlife at Sundarbans",
    description:
      "Discover the majestic Royal Bengal Tigers and the mangrove forest over a 6-day tour.",
  },
  {
    bgImage:
      "https://www.travelmate.com.bd/wp-content/uploads/2020/08/Kuakata-Morning.jpg.webp",
    name: "Beach Vibes in Kuakata",
    description:
      "Enjoy the sunrise and sunset at the 'Daughter of the Sea' on this 4-day tour.",
  },
  {
    bgImage:
      "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/18/28c228ed7564a243e811f23d5502e75a_1000x1000.jpg",
    name: "Charming Chittagong",
    description:
      "Explore the port city of Chittagong and its surrounding hills in a 3-day tour.",
  },
  {
    bgImage: "https://www.munlai.com.bd/img/slide/slide2.jpg",
    name: "Eco-Tourism in Bandarban",
    description:
      "Reconnect with nature in Bandarban's serene eco-tourist spots during a 5-day trip.",
  },
  {
    bgImage: "https://today.thefinancialexpress.com.bd/uploads/1654533069.jpg",
    name: "Pilgrimage to Bagerhat",
    description:
      "A 2-day spiritual journey to the historical mosques of Bagerhat.",
  },
  {
    bgImage:
      "https://lastdaytrip.com/wp-content/uploads/2022/03/Buddhist-Heritage-in-Bangladesh-870x555.gif",
    name: "Historic Bogra and Mahasthangarh",
    description:
      "Dive into history with this 3-day tour of Mahasthangarh and Bogra.",
  },
];

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination]} // Include the Pagination module
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true, // Make pagination dots clickable
          dynamicBullets: true, // Optional: enables dynamic resizing of the dots
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {bannerData.map((data, idx) => (
          <SwiperSlide key={idx}>
            <Slide
              heading={data?.name}
              description={data?.description}
              bgImage={data?.bgImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
