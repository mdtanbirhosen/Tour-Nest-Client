import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import InternalLoading from "../../../../components/Loading/InternalLoading";

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [selectedRole, setSelectedRole] = useState(""); // Role filter state
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

  // Refetch users when searchQuery or selectedRole changes
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
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
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
    </div>
  );
};

export default ManageUsers;
