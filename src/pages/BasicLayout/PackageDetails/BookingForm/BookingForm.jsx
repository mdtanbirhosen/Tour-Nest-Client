import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAllTourGuide from "../../../../hooks/useAllTourGuide";
import PropTypes from "prop-types";
import useAuth from "../../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
const BookingForm = ({ packageInfo }) => {
  const [tourDate, setTourDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");
  const [allTourGuide] = useAllTourGuide();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()


  const { user } = useAuth();
  const price = 299; // Static Price

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!tourDate || !selectedGuide) {
      toast.error("Please select a tour date and guide.");
      return;
    }

    const formData = {
      packageId: packageInfo?._id,
      packageName: packageInfo?.name,
      touristName: user?.displayName,
      touristEmail: user?.email,
      tourDate,
      GuideId:selectedGuide,
      price,
    };

    console.log("Form Data:", formData);
    // Submit form data to your API or handle it accordingly
    const data = await axiosSecure.post('/bookings',formData)
    if(data.data.insertedId){
      console.log('added booking')
      Swal.fire({
        icon: "success",
        title: "Booking Success",
        text: `You have booked the ${packageInfo.name} Tour.`,
        showCancelButton: true,
        confirmButtonText: "Go to My Bookings",
        cancelButtonText: "Done",
        customClass: {
          confirmButton: "bg-primary-color hover:bg-secondary-color text-white font-semibold py-2 px-4 rounded",
          cancelButton: "bg-secondary-color hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded ml-2",
        },
        buttonsStyling: false, // Disable default SweetAlert2 button styles
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/touristDashboard/myBookings");
        }
      });
      
    }
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Book Your Tour</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Package Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Package Name
            </label>
            <input
              type="text"
              value={packageInfo?.name || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
            />
          </div>

          {/* Tourist Information */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Tourist Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Tourist Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Tourist Image URL
            </label>
            <input
              type="text"
              value={user?.photoURL || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Price</label>
            <input
              type="text"
              value={`$${price}`}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
            />
          </div>

          {/* Tour Date */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Tour Date
            </label>
            <DatePicker
              required
              selected={tourDate}
              onChange={(date) => setTourDate(date)}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholderText="Select a tour date"
            />
          </div>

          {/* Tour Guide */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Tour Guide
            </label>
            <select
              required
              value={selectedGuide}
              onChange={(e) => setSelectedGuide(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="" disabled>
                Select guide
              </option>
              {allTourGuide && allTourGuide.length > 0 ? (
                allTourGuide.map((tourGuide) => (
                  <option key={tourGuide?._id} value={tourGuide._id}>
                    {tourGuide.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No guides available
                </option>
              )}
            </select>
          </div>
        </div>
        {/* Book Now Button */}
        {user ? (
          <Button type="submit" text="Book Now"></Button>
        ) : (
          <Link to={"/login"}>
            <Button text="Login to Book"></Button>
          </Link>
        )}
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  packageInfo: PropTypes.object.isRequired,
};

export default BookingForm;
