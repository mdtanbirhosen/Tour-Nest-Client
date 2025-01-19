import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUserInfo from "../../../../hooks/useUserInfo";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import storyAnimation from "../../../../assets/storyAnimation.json"
import Lottie from "lottie-react";
import Button from "../../../../components/Button/Button";
import Title from "../../../../components/Title/Title";
import toast from "react-hot-toast";

const AddStories = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUserInfo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_hosting_key
        }`,
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
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || images.length === 0) {
      toast.warn("Please fill in all fields and upload at least one image.");
      return;
    }

    try {
      // Upload each image to ImgBB
      const uploadedImageUrls = await Promise.all(
        images.map((image) => uploadToImgBB(image))
      );

      // Prepare data for your API
      const storyData = {
        title,
        text: description,
        images: uploadedImageUrls, // URLs of the uploaded images
        authorName: userInfo.name,
        authorRole: userInfo.role,
        authorEmail: userInfo.email,
        date: new Date(),
      };

      // Submit the story data to your backend
      const response = await axiosSecure.post("/addStories", storyData);
      console.log(response);

      if (response.status === 200) {
        toast.success("Story added successfully!");
        navigate("/dashboard/touristDashboard/manageStories");
      }
    } catch (error) {
      console.error("Error adding story:", error);
      toast.error("Failed to add story. Please try again.");
    }
  };

  return (
    <div className="py-10 md:px-10">
      <Title title="--Add Story--"></Title>
      <div className="flex-col md:flex-row flex gap-5  items-center justify-center">
      <div className="w-1/2 ">
            <Lottie animationData={storyAnimation}></Lottie>
        </div>
        <div className="p-6 w-full md:w-1/2 mx-auto bg-white rounded-lg shadow text-primary-color">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Add a Story</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="images" className="block font-medium mb-2">
                Upload Images
              </label>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              text="Add Story"
            >
              
            </Button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default AddStories;
