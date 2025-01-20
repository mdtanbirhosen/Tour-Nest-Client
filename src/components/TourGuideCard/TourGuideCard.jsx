import PropTypes from "prop-types";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const TourGuideCard = ({ tourGuide }) => {
  const { photoURL, name, bio, ratings, _id } = tourGuide;


  return (
    <div className="card card-side bg-base-100 shadow-xl flex-col sm:flex-row rounded-2xl">
      <figure>
        <img
          src={photoURL}
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
          <Link to={`/tourGuideProfile/${_id}`}>
            <Button text="Details"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
TourGuideCard.propTypes = {
  tourGuide: PropTypes.object.isRequired,
};
export default TourGuideCard;
