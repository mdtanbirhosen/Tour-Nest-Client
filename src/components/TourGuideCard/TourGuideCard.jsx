import PropTypes from "prop-types";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const TourGuideCard = ({ randomGuide }) => {
  const { image, name, bio, ratings, _id } = randomGuide;
  //   available: false;
  //   bio: "Specialist in adventure tours.";
  //   email: "tourguide2@gmail.com";
  //   experience: "5 years in tourism";
  //   image: "https://t4.ftcdn.net/jpg/01/14/63/05/360_F_114630530_wgchcsvQKc4JVayxGPJ6ISKZwWVq5zmr.jpg";
  //   name: "Jane Smith";
  //   ratings: 4.8;
  //   _id: "6787deedfc49be3c65f4638e";

  return (
    <div className="card card-side bg-base-100 shadow-xl flex-col sm:flex-row rounded-2xl">
      <figure>
        <img
          src={image}
          className="h-[300px] sm:h-[200px] w-full sm:w-[150px] object-cover rounded-r-2xl  sm:rounded-r-none"
          alt="Movie"
        />
      </figure>
      <div className="card-body p-3 md:p-5">
        <h2 className="card-title">{name}</h2>
        <p>
          <strong>BIO:</strong> {bio}
        </p>
        <p>
          <strong>ratings:</strong> {ratings}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/tourGuideDetails/${_id}`}>
            <Button text="Details"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
TourGuideCard.propTypes = {
  randomGuide: PropTypes.object.isRequired,
};
export default TourGuideCard;
