import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTourGuide from "../hooks/useTourGuide";
import Loading from "../components/Loading/Loading";
import PropTypes from "prop-types";

const TouristGuideRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const [isTourGuide,isTourGuideLoading] = useTourGuide();
    const location = useLocation();
    if(loading || isTourGuideLoading){
        return <Loading></Loading>
    }
    if(user && isTourGuide){
        return children;
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};
TouristGuideRoutes.propTypes ={
    children: PropTypes.node.isRequired
}
export default TouristGuideRoutes;