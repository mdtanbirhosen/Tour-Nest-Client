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
import useTourGuide from "../../../../hooks/useTourGuide";

const ManageProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [userInfo] = useUserInfo();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [isAdmin] = useAdmin();
  const [isTourGuide] = useTourGuide();
  const [uploadedImageURL, setUploadedImageURL] = useState(userInfo?.photoURL || user.photoURL);
  const axiosSecure = useAxiosSecure();

  let formattedDate = "N/A";
  if (userInfo?.createdAt) {
    const createdAtDate = new Date(userInfo.createdAt);
    if (!isNaN(createdAtDate)) {
      formattedDate = format(createdAtDate, "yyyy-MM-dd");
    }
  }

  const handleEditProfile = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const bio = formData.get("bio");
    const experience = formData.get("experience");
    const ratings = formData.get("ratings");
    const image = formData.get("image");

    let newImageURL = uploadedImageURL;

    if (image && image.size > 0) {
      try {
        setUploading(true);
        const imageUploadData = new FormData();
        imageUploadData.append("image", image);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`,
          imageUploadData
        );
        newImageURL = response.data.data.display_url;
        setUploadedImageURL(newImageURL);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
        console.error("Image upload failed:", error);
        setUploading(false);
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
      photoURL: newImageURL,
      createdAt: userInfo.createdAt,
      updatedAt: new Date(),
    };

    try {
      const res = await axiosSecure.put("/user", updatedUserInfo);
      if (res.data.acknowledged) {
        toast.success("Profile updated successfully!");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-10 px-5 justify-center h-full lg:min-h-screen text-white">
      <div className=" p-6 w-full ">
        <div className=" space-y-5">
          <img
            src={uploadedImageURL}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-500"
          />
          <h1 className="text-2xl font-semibold text-gray-800 text-center">{userInfo?.name}</h1>
          <p className="text-gray-500 text-sm">Joined on: {formattedDate}</p>
          <p className="text-primary-color">Email: {userInfo?.email}</p>
          <p className="text-primary-color">Bio: {userInfo?.bio || "No Bio Available"}</p>
          <p className="text-primary-color">Experience: {userInfo?.experience || "Not Added"}</p>
          <p className="text-primary-color">Ratings: {userInfo?.ratings || "Not Rated Yet"}</p>
          <p className="mt-2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full">{userInfo?.role}</span>
          </p>
          <div className="mt-6 space-x-4 md:ml-5">
            <Button text="Edit Profile" onClick={handleEditProfile} />
            {!isAdmin && !isTourGuide && (
              <Link to="/dashboard/touristDashboard/joinAsTourGuide">
                <Button text="Apply for Tour Guide" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {isAdmin && <AdminStats />}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" defaultValue={userInfo?.name} className="border p-2 w-full rounded" required />
              <input type="text" name="bio" defaultValue={userInfo?.bio} className="border p-2 w-full rounded" />
              <input type="text" name="experience" defaultValue={userInfo?.experience} className="border p-2 w-full rounded" />
              <input type="text" name="ratings" defaultValue={userInfo?.ratings} className="border p-2 w-full rounded" />
              <input type="file" name="image" accept="image/*" className="border p-2 w-full rounded" />
              <Button type="submit" text={uploading ? "Saving..." : "Save Changes"} disabled={uploading} />
            </form>
            <Button text="Close" onClick={handleCloseModal} className="mt-4 text-red-500 hover:underline" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
