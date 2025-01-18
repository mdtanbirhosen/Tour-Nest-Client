import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useUserInfo from "../../../../hooks/useUserInfo";
import Swal from "sweetalert2";
import InternalLoading from "../../../../components/Loading/InternalLoading";

const MyBookings = () => {
  const [userInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch bookings with TanStack Query
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", userInfo?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/bookings?email=${userInfo?.email}`
      );
      return data;
    },
    enabled: !!userInfo, // Only fetch if userInfo is available
  });

  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId) => {
      const { data } = await axiosSecure.delete(`/bookings/${bookingId}`);
      return data;
    },
    onSuccess: (_, bookingId) => {
      toast.success("Booking canceled successfully.");
      queryClient.setQueryData(["bookings", userInfo?.email], (oldData) =>
        oldData.filter((booking) => booking._id !== bookingId)
      );
    },
    onError: () => {
      toast.error("Failed to cancel booking. Please try again.");
    },
  });

  const handleCancelBooking = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBookingMutation.mutate(bookingId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handlePayBooking = (bookingId) => {
    navigate(`/dashboard/touristDashboard/payment/${bookingId}`);
  };

  if (isLoading) {
    return <InternalLoading />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th className="bg-primary text-white">Package Name</th>
                <th className="bg-primary text-white">Tour Guide</th>
                <th className="bg-primary text-white">Tour Date</th>
                <th className="bg-primary text-white">Price</th>
                <th className="bg-primary text-white">Status</th>
                <th className="bg-primary text-white">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td>{booking.packageName}</td>
                  <td>{booking?.guideDetails?.name}</td>
                  <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                  <td>${booking.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "Pending"
                          ? "badge-warning"
                          : booking.status === "Accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === "Pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePayBooking(booking._id)}
                          className="btn btn-sm btn-success"
                        >
                          Pay
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="btn btn-sm btn-error"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
