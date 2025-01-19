import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddPackage = () => {
  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    images: [], // Store the uploaded image URLs
    tourType: "",
    price: "",
    days: "",
    tourPlan: ["", ""],
  });

  const [imageFiles, setImageFiles] = useState([]); // To store the selected image files
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()

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
      return response.data.data.url; 
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Limit to a maximum of 3 files
    setImageFiles(files);
  };

  const handleTourPlanChange = (index, value) => {
    const updatedTourPlan = [...packageData.tourPlan];
    updatedTourPlan[index] = value;
    setPackageData((prev) => ({
      ...prev,
      tourPlan: updatedTourPlan,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload images to ImgBB and get their URLs
      const uploadedImages = await Promise.all(
        imageFiles.map((file) => uploadToImgBB(file))
      );

      // Prepare package data
      const finalData = {
        ...packageData,
        images: uploadedImages,
        price: parseFloat(packageData.price),
        days: parseInt(packageData.days, 10),
        createdBy: "admin@gmail.com", // Example admin email
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Send package data to the server
      const response = await axiosSecure.post("/package", finalData);
      if (response.data.insertedId) {
        toast.success("Package added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add the package. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Add New Package</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-2">Package Name</label>
          <input
            type="text"
            name="name"
            value={packageData.name}
            onChange={handleChange}
            placeholder="Enter package name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={packageData.description}
            onChange={handleChange}
            placeholder="Enter package description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">
            Upload Images (Up to 3)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageFileChange}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        {/* Tour Type */}
        <div>
          <label className="block font-semibold mb-2">Tour Type</label>
          <select
            name="tourType"
            value={packageData.tourType}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a tour type</option>
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
            <option value="Leisure">Leisure</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-2">Price (in BDT)</label>
          <input
            type="number"
            name="price"
            value={packageData.price}
            onChange={handleChange}
            placeholder="Enter package price"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Days */}
        <div>
          <label className="block font-semibold mb-2">Days</label>
          <input
            type="number"
            name="days"
            value={packageData.days}
            onChange={handleChange}
            placeholder="Enter number of days"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Tour Plan */}
        <div>
          <label className="block font-semibold mb-2">Tour Plan (2 points)</label>
          {packageData.tourPlan.map((plan, index) => (
            <input
              key={index}
              type="text"
              value={plan}
              onChange={(e) => handleTourPlanChange(index, e.target.value)}
              placeholder={`Plan point ${index + 1}`}
              className="input input-bordered w-full mb-2"
              required
            />
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
