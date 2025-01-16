import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import GoogleSignIn from "../../components/GoogleSignIn/GoogleSignIn";

const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        console.log(result);
        form.email.value = "";
        form.password.value = "";
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-primary-color flex items-center justify-center py-5 md:py-10 px-5">
      <div className="max-w-6xl bg-white rounded-2xl shadow-lg grid lg:grid-cols-2 items-center w-full overflow-hidden">
        {/* Lottie or Image Section */}
        <div className="hidden lg:flex justify-center items-center bg-gray-100 p-5 md:p-10">
          {/* Replace this div with your Lottie animation or image */}
          <div className="w-full max-w-xs">
            <img
              src="https://via.placeholder.com/400x400"
              alt="Login Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="p-5 md:p-8 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-color">
            Login to Your Account
          </h2>
          <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
            Enter your credentials to access your account
          </p>
          <div className="divider my-3 md:my-5"></div>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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

            {/* Password Input */}
            <div>
              <label className="block font-medium text-lg text-primary-color">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
                name="password"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-primary-color hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary-color text-white font-semibold rounded-lg hover:bg-secondary-color transition-all"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-4 md:mt-5 text-sm md:text-base">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-500 hover:underline"
            >
              Register
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

export default Login;
