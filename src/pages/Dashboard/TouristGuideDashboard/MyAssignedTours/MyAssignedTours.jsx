import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import InternalLoading from "../../../../components/Loading/InternalLoading";

const MyAssignedTours = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all assigned tours for the tour guide
  const { data: assignedTours = [], refetch , isLoading} = useQuery({
    queryKey: ["my assigned tours"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/assignedTours/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  // Handle Accept Button Click
  const handleAccept = async (tourId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this tour!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/updateTourStatus/${tourId}`, { status: "accepted" });
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Tour accepted successfully!");
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to accept the tour.");
        }
      }
    });
  };

  // Handle Reject Button Click
  const handleReject = async (tourId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this tour!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/updateTourStatus/${tourId}`, { status: "rejected" });
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Tour rejected successfully!");
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to reject the tour.");
        }
      }
    });
  };

  if (isLoading) {
    return <InternalLoading></InternalLoading>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">My Assigned Tours</h1>
      <div className="overflow-x-auto">
        {assignedTours.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            {/* TODO: a lottie file */}
            <p>No assigned tours found.</p>
          </div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Tourist Name</th>
                <th>Tour Date</th>
                <th>Tour Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedTours.map((tour) => (
                <tr key={tour._id}>
                  <td>{tour.packageName}</td>
                  <td>{tour.touristName}</td>
                  <td>{tour.tourDate}</td>
                  <td>${tour.price}</td>
                  <td>
                    <span
                      className={`btn btn-sm ${
                        tour.status === "Pending"
                          ? "badge-warning"
                          : tour.status === "In Review"
                          ? "badge-info"
                          : tour.status === "Accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {tour.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex">
                      <button
                        className={`btn btn-success btn-sm ${
                          tour.status === "Pending" ? "btn-disabled" : ""
                        }`}
                        disabled={tour.status === "Pending"}
                        onClick={() => handleAccept(tour._id)}
                      >
                        Accept
                      </button>
                      {tour.status === "Pending" && (
                        <button
                          className="btn btn-error btn-sm ml-2"
                          onClick={() => handleReject(tour._id)}
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyAssignedTours;
