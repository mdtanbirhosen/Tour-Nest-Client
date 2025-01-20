import { Helmet } from "react-helmet-async";
import OverView from "./OverView/OverView";
import TourismAndTravelGuide from "./TourismAndTravelGuide/TourismAndTravelGuide";
import TouristStory from "./TouristStory/TouristStory";
import Title from "../../../components/Title/Title";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>HOME || TOUR NEST</title>
      </Helmet>
      {/* over view section  */}
      <section className="my-10">
        <OverView></OverView>
      </section>
      {/* Tourism and Travel Guide Section*/}
      <section className="my-10 px-2 md:px-5 py-8 md:py-10 bg-white rounded-2xl">
        <Title title="Tourism And Travel Guide" subTitle={'See our Tour place and our guides. Login and go to details page to see more..'}></Title>
        <TourismAndTravelGuide></TourismAndTravelGuide>
      </section>
      <section className="my-10 px-2">
        <Title title="Tourist Stories" subTitle={'Here is some of our tourist written stories on historical places.'}></Title>
        <TouristStory></TouristStory>
      </section>
    </div>
  );
};

export default Home;
