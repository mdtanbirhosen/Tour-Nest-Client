import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  // validate if loading
  if (loading) return <Loading></Loading>;

  // validate if not logged in
  if (!user) return <Navigate to={"/login"} state={{from:location}} replace></Navigate>;


  return children;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
