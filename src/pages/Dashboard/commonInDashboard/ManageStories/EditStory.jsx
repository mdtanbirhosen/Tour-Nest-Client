import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Fetch the story details when the component mounts
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axiosPublic.get(`/stories/${id}`);
        setStory(response.data);
      } catch (error) {
        console.error("Error fetching story:", error);
        toast.error("Failed to fetch story details.");
      }
    };

    fetchStory();
  }, [axiosPublic, id]);

  // Function to remove a photo from the story
  const handleRemovePhoto = async (photo) => {
    try {
      await axiosSecure.put(`/stories/${id}/photos`, {
        removePhoto: photo,
      });

      setStory((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== photo),
      }));

      toast.success("Photo removed successfully!");
    } catch (error) {
      console.error("Error removing photo:", error);
      toast.error("Failed to remove photo.");
    }
  };

  // Function to upload an image to ImgBB
  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data.url; // Returns the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
      throw new Error("Failed to upload image.");
    }
  };

  // Function to add new photos to the story
  const handleAddPhotos = async () => {
    try {
      const uploadedUrls = await Promise.all(
        newImages.map((image) => uploadToImgBB(image))
      );

      await axiosSecure.put(`/stories/${id}/photos`, {
        addPhotos: uploadedUrls,
      });

      setStory((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      toast.success("Photos added successfully!");
      setNewImages([]);
    } catch (error) {
      console.error("Error adding photos:", error);
      toast.error("Failed to add photos.");
    }
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Story</h2>

      {/* Current Photos Section */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Current Photos</h3>
        <div className="flex flex-wrap gap-2">
          {story.images.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo}
                alt={`Photo ${index}`}
                className="w-24 h-24 object-cover rounded shadow"
              />
              <button
                onClick={() => handleRemovePhoto(photo)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Photos Section */}
      <div className="mb-4">
        <label htmlFor="newImages" className="block font-medium mb-2">
          Add New Photos
        </label>
        <input
          type="file"
          id="newImages"
          accept="image/*"
          multiple
          onChange={(e) => setNewImages(Array.from(e.target.files))}
          className="block w-full mb-2 border rounded p-2"
        />
        <button
          onClick={handleAddPhotos}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={newImages.length === 0}
        >
          Add Photos
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/touristDashboard/manageStories")}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
    </div>
  );
};

export default EditStory;
