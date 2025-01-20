import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../../components/Button/Button";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all applications on component mount
  const { data: applications = [], refetch } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const res = await axiosSecure("/applications");
      console.log(res);
      return res.data;
    },
  });

  // Handle Accept Action (Update role and delete application)
  const handleAccept = async (applicationId, applicantEmail) => {
    try {
      // Update user role to "Tour Guide"
      const update = await axiosSecure.patch(`/user/${applicantEmail}`, {
        role: "tour guide",
      });
      if (update.data.modifiedCount > 0) {
        const deletedData = await axiosSecure.delete(
          `/applications/${applicationId}`
        );
        if (deletedData.data.deletedCount) {
          toast.success("Application accepted and user role updated!");
          refetch();
        }
      }
    } catch (error) {
      console.error("Failed to accept the application:", error);
      toast.error("Failed to accept the application.");
    }
  };

  // Handle Reject Action (Delete application)
  const handleReject = async (applicationId) => {
    try {
      const deletedData = await axiosSecure.delete(
        `/applications/${applicationId}`
      );
      if (deletedData.data.deletedCount) {
        toast.success("Application rejected and deleted.");
        refetch();
      }
    } catch (error) {
      console.error("Failed to reject the application:", error);
      toast.error("Failed to reject the application.");
    }
  };

  // Pagination calculations
  const totalItems = applications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = applications.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center text-primary-color mb-4">
        Manage Candidates
      </h1>

      {/* Table for displaying the applications */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No applications available
              </td>
            </tr>
          ) : (
            currentData.map((application) => (
              <tr key={application._id}>
                <td className="border p-2">{application.applicantName}</td>
                <td className="border p-2">{application.applicantEmail}</td>
                <td className="border p-2">{application.title}</td>
                <td className="border p-2 flex space-x-2">
                  <Button
                    text="Accept"
                    onClick={() =>
                      handleAccept(application._id, application.applicantEmail)
                    }
                  />
                  <Button
                    text="Reject"
                    onClick={() => handleReject(application._id)}
                    className="bg-red-500 text-white"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Footer */}
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
  );
};

export default ManageCandidates;
