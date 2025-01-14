import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  // validate if loading
  if (loading) return <div>loading</div>;

  // validate if not logged in
  if (!user) return <Navigate to={"/login"} state={{from:location}} replace></Navigate>;


  return children;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
