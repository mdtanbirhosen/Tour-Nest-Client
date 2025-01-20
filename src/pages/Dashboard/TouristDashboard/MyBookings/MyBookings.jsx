import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useUserInfo from "../../../../hooks/useUserInfo";
import Swal from "sweetalert2";
import InternalLoading from "../../../../components/Loading/InternalLoading";
import Button from "../../../../components/Button/Button";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const MyBookings = () => {
  const [userInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Number of items per page
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const { width, height } = useWindowSize(); // Get window dimensions

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

  // Pagination logic
  const totalItems = bookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = bookings.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (bookings.length > 3) {
      setShowConfetti(true);
    }
  }, [bookings]);

  const handleApplyDiscount = () => {
    toast.success("Discount applied to your next booking!");
    setShowConfetti(false); // Hide confetti after applying the discount
  };

  if (isLoading) {
    return <InternalLoading />;
  }

  return (
    <div className="p-2 md:p-6">
      {showConfetti && <Confetti width={width} height={height} />}
      <h2 className="text-2xl font-semibold text-center mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div>
          {bookings.length > 3 && (
            <div className="p-4 mb-6 bg-green-100 rounded-lg text-center shadow-lg">
              <h3 className="text-lg font-bold text-green-800">
                🎉 Congratulations! 🎉
              </h3>
              <p className="text-green-700">
                You&apos;ve booked more than 3 times! You’re eligible for a special
                discount on your next booking.
              </p>
              <Button
                text="Apply Discount"
                onClick={handleApplyDiscount}
                className="mt-4 bg-green-600 text-white hover:bg-green-500"
              />
            </div>
          )}

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
                {currentData.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-100">
                    <td>{booking.packageName}</td>
                    <td>{booking?.guideDetails?.name}</td>
                    <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                    <td>${booking.price}</td>
                    <td>
                      <span
                        className={`badge btn w-full
                          ${booking.status === "Pending" && "bg-yellow-400"}
                          ${booking.status === "in review" && "bg-green-400"}
                        `}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.status === "Pending" && (
                        <div className="flex space-x-2">
                          <Button
                            text="Pay"
                            onClick={() => handlePayBooking(booking._id)}
                          />
                          <Button
                            text="Cancel"
                            onClick={() => handleCancelBooking(booking._id)}
                            className="bg-red-500 hover:bg-red-300"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <span>
                Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of{" "}
                {totalItems}
              </span>
              <div className="flex space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
