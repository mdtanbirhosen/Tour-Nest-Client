import { Helmet } from "react-helmet-async";
import OverView from "./OverView/OverView";
import TourismAndTravelGuide from "./TourismAndTravelGuide/TourismAndTravelGuide";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>HOME || TOUR NEST</title>
      </Helmet>
      {/* over view section  */}
      <section>
        <OverView></OverView>
      </section>
      {/* Tourism and Travel Guide Section*/}
      <section className="my-10 px-2 md:px-5 py-8 md:py-10 bg-white rounded-2xl">
        <TourismAndTravelGuide></TourismAndTravelGuide>
      </section>
    </div>
  );
};

export default Home;
