import { Helmet } from "react-helmet-async";
import Title from "../../../components/Title/Title";
import useAllPackages from "../../../hooks/useAllPackages";
import PackagesCard from "../../../components/PackagesCard/PackagesCard";

const Trips = () => {
  const [allPackages] = useAllPackages();
 
  return (
    <div>
      <Helmet>
        <title>Trips || TOUR NEST</title>
      </Helmet>
      <section className="mb-10">
        <Title title="All Trips" subTitle={'All trips packages are available here. You can select any of packages for your tour.'}></Title>
        <div className="bg-white p-2 md:p-5 rounded-lg">
          <div>
          all functionalities
          </div>
          <div className="divider"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {allPackages.map((packageInfo) => (
                  <PackagesCard key={packageInfo._id} randomPackage={packageInfo}></PackagesCard>
                ))}
              </div>
            </div>
      </section>
    </div>
  );
};

export default Trips;
