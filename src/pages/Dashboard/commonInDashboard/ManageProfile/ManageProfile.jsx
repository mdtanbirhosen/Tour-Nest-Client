import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";
import Button from "../../../../components/Button/Button";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import AdminStats from "./AdminStats/AdminStats";
import useAdmin from "../../../../hooks/useAdmin";
import useAuth from "../../../../hooks/useAuth";

const ManageProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [userInfo] = useUserInfo();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [isAdmin] = useAdmin();
  const [uploadedImageURL, setUploadedImageURL] = useState(
    userInfo?.photoURL || user.photoURL
  ); // Use state for better management
  const axiosSecure = useAxiosSecure();

  let formattedDate = "N/A";
  if (userInfo?.createdAt) {
    const createdAtDate = new Date(userInfo.createdAt);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const image = formData.get("image");
    const bio = formData.get("bio");
    const experience = formData.get("experience");
    const ratings = formData.get("ratings");

    // If a new image is selected, upload it
    if (image && image.size > 0) {
      try {
        setUploading(true);
        const imageUploadData = new FormData();
        imageUploadData.append("image", image);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_hosting_key
          }`,
          imageUploadData
        );
        setUploadedImageURL(response.data.data.display_url); // Update state with the new image URL
        setUploading(false);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        setUploading(false);
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image. Please try again.");
        return;
      }
    }

    const updatedUserInfo = {
      name,
      bio,
      experience,
      ratings,
      email: userInfo?.email,
      role: userInfo?.role,
      photoURL: uploadedImageURL,
      createdAt: userInfo.createdAt,
      updatedAt: new Date(),
    };

    console.log("Updated User Info:", updatedUserInfo);

    // Add logic to update user information (e.g., API call)
    axiosSecure
      .put("/user", updatedUserInfo) // No need for { updatedUserInfo }
      .then((res) => {
        console.log(res);
        if (res.data.acknowledged) {
          toast.success("Profile updated successfully!");
          setShowModal(false);
        }
      })
      .catch((error) => {
        console.error(error); // Fixed: Use .catch for error handling
      });
  };

  return (
    <div className="flex flex-col items-center w-full  py-10 px-5 justify-center h-full lg:min-h-screen text-white">
      <div>
        <div className="text-center">
          <img
            src={userInfo?.photoURL}
            // Use updated image URL

            alt="Profile"
            className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold text-primary-color">
            Welcome, {userInfo?.name}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base">
            Created At: {formattedDate}
          </p>
          <p className="text-primary-color text-xs sm:text-sm md:text-base">
            Email: {userInfo?.email}
          </p>
          <p className="text-primary-color text-xs sm:text-sm md:text-base">
            Bio: {userInfo?.bio}
          </p>
          <p className="text-primary-color text-xs sm:text-sm md:text-base">
            Experience: {userInfo?.experience}
          </p>
          <p className="text-primary-color text-xs sm:text-sm md:text-base">
            Ratings: {userInfo?.ratings}
          </p>
          <p className="mt-2 text-xs sm:text-sm md:text-base">
            <span className="bg-blue-600 px-3 py-1 rounded-full">
              Role: {userInfo?.role}
            </span>
          </p>
          <div className="mt-4 space-x-4 space-y-4">
            <Button text="Edit Profile" onClick={handleEditProfile}></Button>
            <Link to={"/dashboard/touristDashboard/joinAsTourGuide"}>
              <Button text="Apply for Tour Guide"></Button>
            </Link>
          </div>
        </div>
      </div>
      <div>{isAdmin && <AdminStats></AdminStats>}</div>

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
                  required
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
                <label className="block text-sm font-medium">BIO</label>
                <input
                  type="text"
                  name="bio"
                  defaultValue={userInfo?.bio}
                  className="border p-2 w-full rounded bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Experience</label>
                <input
                  type="text"
                  name="experience"
                  defaultValue={userInfo?.experience}
                  className="border p-2 w-full rounded bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Ratings</label>
                <input
                  type="text"
                  name="ratings"
                  defaultValue={userInfo?.ratings}
                  className="border p-2 w-full rounded bg-gray-100"
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
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="border p-2 w-full rounded"
                />
              </div>
              <Button
                type="submit"
                text={uploading ? "Saving..." : "Save Changes"}
                disabled={uploading}
              ></Button>
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
