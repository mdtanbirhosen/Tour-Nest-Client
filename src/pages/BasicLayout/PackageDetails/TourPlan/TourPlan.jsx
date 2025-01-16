import PropTypes from "prop-types";
const tourData = [
    
        "Explore iconic landmarks and historic sites in the bustling heart of Manhattan. Stroll through SoHo's vibrant streets and enjoy breathtaking views on the Staten Island Ferry.",
        "Discover the cultural and culinary heritage of New York City. Visit Ellis Island, explore history at the Tenement Museum, and savor local cuisine on a guided food tour."
    
  ];
const TourPlan = ({ packageInfo ={} }) => {
  return (
    <div className="">
      <div className="space-y-4">
        {packageInfo?.tourPlan?.map((plan, index) => (
          <div key={index} className="collapse collapse-arrow border-2 rounded-lg bg-white">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-semibold">
              Day_{plan.day} - {plan.details}
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                {tourData[index]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TourPlan.propTypes = {
  packageInfo: PropTypes.object.isRequired,
};

export default TourPlan;
