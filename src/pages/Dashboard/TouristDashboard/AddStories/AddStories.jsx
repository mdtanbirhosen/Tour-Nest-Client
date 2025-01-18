import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStories = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || images.length === 0) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        "http://your-api-endpoint/stories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("Story added successfully!");
        navigate("/dashboard/manage-stories"); // Navigate to the manage stories route
      }
    } catch (error) {
      console.error("Error adding story:", error);
      alert("Failed to add story. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add a Story</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Story
        </button>
      </form>
    </div>
  );
};

export default AddStories;
