import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Button from "../../../../components/Button/Button";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const JoinAsTourGuide = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (
      !formData.title.trim() ||
      !formData.reason.trim() ||
      !formData.cvLink.trim()
    ) {
      toast.error("Please fill out all fields.");
      return;
    }
    const applicationData ={
        ...formData,
        applicantEmail: user?.email,
        applicantName: user?.displayName
    }
    console.log(applicationData)

    try {
      // Send a POST request to your backend with JWT token
      
      const response = await axiosSecure.post("/applications", applicationData);
      console.log(response)

      // Check if the application already exists
      if (response.data.insertedId === null) {
        toast.error(response?.message || "Application already exists.");
        return;
      }

      // Show success notification
      Swal.fire({
        title: "Application Successful",
        text: "Your application has been submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear form data
      setFormData({ title: "", reason: "", cvLink: "", });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred while submitting the application.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-primary-color mb-6">
        Join as a Tour Guide
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Application Title */}
        <div className="form-control">
          <label htmlFor="title" className="label">
            <span className="label-text">Application Title</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter application title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Reason for Application */}
        <div className="form-control">
          <label htmlFor="reason" className="label">
            <span className="label-text">Why do you want to be a Tour Guide?</span>
          </label>
          <textarea
            name="reason"
            id="reason"
            value={formData.reason}
            onChange={handleInputChange}
            rows="4"
            placeholder="Explain why you want to become a tour guide"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* CV Link */}
        <div className="form-control">
          <label htmlFor="cvLink" className="label">
            <span className="label-text">CV Link</span>
          </label>
          <input
            type="url"
            name="cvLink"
            id="cvLink"
            value={formData.cvLink}
            onChange={handleInputChange}
            placeholder="Enter your CV link"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <Button
          text="Submit Application"
          type="submit"
          className="btn btn-primary w-full"
        >
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default JoinAsTourGuide;
