import PropTypes from "prop-types";

const AboutTourPackage = ({ packageInfo }) => {
  const { images, name, createdBy, tourType, price, days, description } =
    packageInfo;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img className="h-full w-full object-cover" src={images[2]} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          <strong>Created By: </strong>
          {createdBy}
        </p>
        <p>
          <strong>Tour Type: </strong>
          {tourType}
        </p>
        <p>
          <strong>Price: </strong>
          {price}
        </p>
        <p>
          <strong>Days: </strong>
          {days}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};
AboutTourPackage.propTypes = {
  packageInfo: PropTypes.object.isRequired,
};
export default AboutTourPackage;
