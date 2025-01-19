import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Title from "../../../../../components/Title/Title";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch admin stats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading stats...</div>;
  }

  return (
    <div className="  mt-10">
      <Title title="Admin Stats" />
      <div className="flex gap-5 flex-wrap items-center justify-center">
        {/* Total Payments */}
        <div className="bg-blue-300 w-full sm:w-auto p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold">Total Payments</h3>
          <p className="text-xl mt-4 text-primary-color font-bold">${stats?.revenue || 0}</p>
        </div>

        {/* Total Tour Guides */}
        <div className="bg-green-300 w-full sm:w-auto p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold">Total Tour Guides</h3>
          <p className="text-xl mt-4 text-primary-color font-bold">{stats?.touristGuides || 0}</p>
        </div>

        {/* Total Packages */}
        <div className="bg-yellow-300 w-full sm:w-auto p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold">Total Packages</h3>
          <p className="text-xl mt-4 text-primary-color font-bold">{stats?.packages || 0}</p>
        </div>

        {/* Total Clients */}
        <div className="bg-red-300 w-full sm:w-auto p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold">Total Clients</h3>
          <p className="text-xl mt-4 text-primary-color font-bold">{stats?.users || 0}</p>
        </div>

        {/* Total Stories */}
        <div className="bg-purple-300 w-full sm:w-auto p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold">Total Stories</h3>
          <p className="text-xl mt-4 text-primary-color font-bold">{stats?.stories || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
