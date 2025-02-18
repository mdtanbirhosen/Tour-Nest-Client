import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Title from "../../../components/Title/Title";
import useAllPackages from "../../../hooks/useAllPackages";
import PackagesCard from "../../../components/PackagesCard/PackagesCard";

const Trips = () => {
  const [allPackages] = useAllPackages();
  const [sortOrder, setSortOrder] = useState("default");

  // Sorting function
  const sortedPackages = [...allPackages].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div>
      <Helmet>
        <title>Trips || TOUR NEST</title>
      </Helmet>
      <section className="mb-10">
        <Title title="All Trips" subTitle="All trip packages are available here. You can select any package for your tour." />
        
        <div className="bg-white p-2 md:p-5 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Sort By Price:</p>
            <select
              className="border px-3 py-1 rounded-md"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          <div className="divider"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedPackages.map((packageInfo) => (
              <PackagesCard key={packageInfo._id} randomPackage={packageInfo} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trips;
