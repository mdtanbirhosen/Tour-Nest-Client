import { format } from "date-fns";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";
import Button from "../../../../components/Button/Button";
import toast from "react-hot-toast";

const ManageProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [userInfo] = useUserInfo();
  const navigate = useNavigate();

  // Ensure createdAt is parsed to a valid Date
  let formattedDate = "N/A";
  if (userInfo?.createdAt) {
    const createdAtDate = new Date(userInfo.createdAt); // Convert to Date object
    if (!isNaN(createdAtDate)) {
      formattedDate = format(createdAtDate, "yyyy-MM-dd");
    } else {
      console.error("Invalid date value for createdAt:", userInfo.createdAt);
    }
  }


  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApplyTourGuide = () => {
    navigate("/dashboard/touristDashboard/joinAsTourGuide");
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target); // Collect form data
    const updatedUserInfo = {
      name: formData.get("name"), // Access form fields by their name attributes
      email: userInfo?.email, // Email is read-only
      role: userInfo?.role, // Role is read-only
    };

    console.log("Updated User Info:", updatedUserInfo);

    // Add logic to update user information here (e.g., API call)
    toast.success("Profile updated successfully!");

    setShowModal(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center w-full justify-center min-h-[calc(100vh-66px)] lg:min-h-screen  text-white">
      <div className="text-center">
        <img
          src={userInfo?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-primary-color">
          welcome, {userInfo?.name}
        </h1>
        <p className="text-gray-400">Created At : {formattedDate}</p>
        <p className=" text-primary-color">Email : {userInfo?.email}</p>
        <p className="text-sm mt-2">
          <span className="bg-blue-600 px-3 py-1 rounded-full">
            Role: {userInfo?.role}
          </span>
        </p>
        <div className="mt-4 space-x-4 space-y-4">
          <Button text="Edit Profile" onClick={handleEditProfile}></Button>
          <Button
            text="Apply for Tour Guide"
            onClick={handleApplyTourGuide}
          ></Button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={userInfo?.name}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={userInfo?.email}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Role</label>
                <input
                  type="text"
                  name="role"
                  defaultValue={userInfo?.role}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </div>
              <Button type="submit" text="Save Changes"></Button>
            </form>
            <Button
              text="Close"
              onClick={handleCloseModal}
              className="mt-4 text-red-500 hover:underline"
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
