import PackagesCard from "../../../../../components/PackagesCard/PackagesCard";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const OurPackages = () => {
  const axiosPublic = useAxiosPublic();

  const { data: randomPackages = [] } = useQuery({
    queryKey: ["packages-random"],
    queryFn: async () => {
      const res = await axiosPublic("/packages?random=true");
      return res.data;
    },
  });

  console.log(randomPackages);
  return (
    <div className="mt-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {randomPackages.map((randomPackage) => (
          <PackagesCard key={randomPackage._id} randomPackage={randomPackage}></PackagesCard>
        ))}
      </div>
    </div>
  );
};

export default OurPackages;
