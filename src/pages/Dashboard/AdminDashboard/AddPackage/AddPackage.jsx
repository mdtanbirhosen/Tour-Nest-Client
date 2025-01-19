import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AddPackage = () => {
  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    images: ["", "", ""],
    tourType: "",
    price: "",
    days: "",
    tourPlan: ["", ""],
  });

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...packageData.images];
    updatedImages[index] = value;
    setPackageData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
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

    // Add metadata
    const finalData = {
      ...packageData,
      price: parseFloat(packageData.price),
      days: parseInt(packageData.days, 10),
      createdBy: "admin@gmail.com", // Example admin email
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await axiosSecure.post("/packages", finalData);
      if (response.data.insertedId) {
        toast.success("Package added successfully!");
        navigate("/admin/packages"); // Redirect to packages list
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

        {/* Images */}
        <div>
          <label className="block font-semibold mb-2">Image URLs (3)</label>
          {packageData.images.map((image, index) => (
            <input
              key={index}
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`Image URL ${index + 1}`}
              className="input input-bordered w-full mb-2"
              required
            />
          ))}
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
