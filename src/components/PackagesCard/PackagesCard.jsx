import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const PackagesCard = ({randomPackage}) => {
    
    const {_id,name, price, tourType ,images} = randomPackage;
    // console.log(randomPackage)
  return (
    <div className="card card-compact bg-base-100  shadow-xl">
      <figure>
        <img
          src={images[0]}
          className="w-full h-[200px] md:h-[250px] object-cover"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p><strong>Tour Type:</strong> {tourType}</p>
        <p><strong>Price:</strong> {price}</p>
        <div className="card-actions ">
          <Link to={`/packageDetails/${_id}`}><Button text="View Details"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
PackagesCard.propTypes ={
    randomPackage: PropTypes.object.isRequired,
}
export default PackagesCard;
