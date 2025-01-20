import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import InternalLoading from "../../../../components/Loading/InternalLoading";

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [selectedRole, setSelectedRole] = useState(""); // Role filter state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Number of users per page
  const axiosPublic = useAxiosPublic();

  // Fetch users using TanStack Query
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", selectedRole, searchQuery], // Use searchQuery and selectedRole as query keys
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/users?role=${selectedRole}&search=${searchQuery}`
      );
      return res.data;
    },
    enabled: false, // Disable automatic fetching
  });

  // Refetch users when searchQuery, selectedRole, or pagination state changes
  useEffect(() => {
    refetch();
  }, [searchQuery, selectedRole, refetch]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle role filter change
  const handleRoleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    setSelectedRole(value);
  };

  // Pagination calculations
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = users.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "tourist", label: "Tourist" },
    { value: "tour guide", label: "Tour Guide" },
  ];

  return (
    <div className="max-w-6xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/* Search and Role Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="input input-bordered w-full md:w-1/2"
        />
        <div className="w-full md:w-1/2">
          <Select
            options={roleOptions}
            onChange={handleRoleChange}
            placeholder="Filter by role"
            isClearable
          />
        </div>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <InternalLoading></InternalLoading>
      ) : isError ? (
        <div className="text-center text-lg font-medium text-red-500">
          Error loading users.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((user, index) => (
                  <tr key={user._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "Tourist"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center flex-col md:flex-row mt-4">
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

export default ManageUsers;
