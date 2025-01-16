import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAllTourGuide from "../../../../hooks/useAllTourGuide";
import PropTypes from "prop-types";
import useAuth from "../../../../hooks/useAuth";

const BookingForm = ({packageInfo}) => {
  const [tourDate, setTourDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");
  const [allTourGuide]= useAllTourGuide();
  
  const packageName = "Explore New York"; // Static Package Name
  const {user} =useAuth()
  const price = 299; // Static Price

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form data captured in variables
    const formData = {
      packageId: packageInfo._id,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      
      tourDate,
      selectedGuide,
    };

    console.log("Form Data:", formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Book Your Tour</h2>
      <form onSubmit={handleSubmit}>
        {/* Package Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Package Name</label>
          <input
            type="text"
            value={packageName}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Tourist Information */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Tourist Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Tourist Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Tourist Image URL</label>
          <input
            type="text"
            value={user?.photoURL}
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
          <label className="block text-sm font-semibold mb-1">Tour Date</label>
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
          <label className="block text-sm font-semibold mb-1">Tour Guide</label>
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {allTourGuide.map(tourGuide=> <option key={tourGuide?._id} value={tourGuide.name}>{tourGuide.name}</option>)}
          </select>
        </div>

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};


BookingForm.propTypes={
    packageInfo: PropTypes.object.isRequired,
}
export default BookingForm;
