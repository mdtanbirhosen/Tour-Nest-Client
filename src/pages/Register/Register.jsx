import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import GoogleSignIn from "../../components/GoogleSignIn/GoogleSignIn";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Lottie from "lottie-react";
import signUpAnimation from '../../assets/signUpAnimation.json'
const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.files[0]; 
    const password = form.password.value;
    console.log(image)

    // Validate the image, email, and password strength
    if (!image) {
      toast.error("Please upload a profile image.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const uploadedImage = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`,{image},{
        headers: {
            'content-type': 'multipart/form-data'
        }})
      console.log(uploadedImage.data.data.display_url)
      const uploadedImageURL=uploadedImage.data.data.display_url
      if(uploadedImageURL){
        // Register user
        createUser(email, password).then((res) => {
          console.log(res);
          updateUserProfile(name,uploadedImageURL)
          .then(() => {
            const userInfo = {
              email: res.user?.email,
              name: res.user?.displayName,
              photoURL: uploadedImageURL,
              createdAt: new Date(),
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
              console.log(res.data)
              toast.success("Registration successful!");
              navigate(location?.state ? location.state : "/");
            })
          });
        });
      }

      // Redirect to home or desired route after successful registration
      // navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Failed to register. Please try again.");
    }
  };

  // Password validation (min 8 chars, 1 uppercase, 1 number, 1 special character)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*0-9])(?=.{6,})/;
    return passwordRegex.test(password);
  };

  return (
    <div className="min-h-screen bg-primary-color flex items-center justify-center py-5 md:py-10 px-5">
      <div className="max-w-6xl bg-white rounded-2xl shadow-lg grid lg:grid-cols-2 items-center w-full overflow-hidden">
        {/* Lottie or Image Section */}
        <div className="hidden lg:flex justify-center items-center bg-gray-100 p-5 md:p-10">
          <Lottie animationData={signUpAnimation}></Lottie>
        </div>

        {/* Register Form Section */}
        <div className="p-5 md:p-8 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-color">
            Create a New Account
          </h2>
          <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
            Enter your details to create an account
          </p>
          <div className="divider my-3 md:my-5"></div>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Name Input */}
            <div>
              <label className="block font-medium text-lg text-primary-color">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
                name="name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block font-medium text-lg text-primary-color">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
                name="email"
                required
              />
            </div>

            {/* Image Input */}
            <div>
              <label className="block font-medium text-lg text-primary-color">
                Profile Image
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
                name="image"
                accept="image/*"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block font-medium text-lg text-primary-color">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter a strong password"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
                name="password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary-color text-white font-semibold rounded-lg hover:bg-secondary-color transition-all"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-4 md:mt-5 text-sm md:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>

          {/* OR Divider */}
          <div className="divider my-3 md:my-5">OR</div>

          {/* Google Sign-In */}
          <div>
            <GoogleSignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
