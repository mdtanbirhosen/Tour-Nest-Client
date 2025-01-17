
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleSignIn = () => {
    const Navigate = useNavigate()
    const {loginUserWithGoogle} = useAuth()
    const axiosPublic= useAxiosPublic()
    const handleSigninWithGoogle = () => {
        loginUserWithGoogle()
          .then((result) => {
            console.log(result);
            const userInfo = {
              email: result.user?.email,
              name: result.user?.displayName,
              photoURL: result.user?.photoURL,
              createdAt:new Date(),
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
              console.log(res.data)
              toast.success("Login Successfully.");
              Navigate(location?.state ? location.state : "/");
            })
          })
          .catch((error) => {
            // toast.error(error.message);
            console.log(error);
          });
      };
    return (
        <button
                onClick={handleSigninWithGoogle}
                className="btn text-white font-bold text-lg bg-primary-color hover:bg-secondary-color   px-3 sm:px-5 py-2 rounded-xl w-full"
              >
                <FcGoogle className="text-3xl"></FcGoogle> Sign in with Google
              </button>
    );
};

export default GoogleSignIn;