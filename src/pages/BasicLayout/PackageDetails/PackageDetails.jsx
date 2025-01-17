import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import PackageGallery from "./PackageGallery/PackageGallery";
import Title from "../../../components/Title/Title";
import AboutTourPackage from "./AboutTourPackage/AboutTourPackage";
import TourPlan from "./TourPlan/TourPlan";
import AllTourGuide from "./AllTourGuide/AllTourGuide";
import BookingForm from "./BookingForm/BookingForm";

const PackageDetails = () => {
  const packageInfo = useLoaderData();
  console.log(packageInfo);
  return (
    <div>
      <Helmet>
        <title>DETAILS || TOUR NEST</title>
      </Helmet>
      <section className="py-5">
        <Title title={`Gallery of ${packageInfo?.name}`}></Title>
        <PackageGallery images={packageInfo?.images} name={packageInfo?.name}></PackageGallery>
      </section>
      <section className="pb-10">
        <Title title={`About ${packageInfo.name} Tour`}></Title>
        <AboutTourPackage packageInfo={packageInfo}></AboutTourPackage>
      </section>
      <section className="pb-10">
        <Title title={`Tour plan`} subTitle={"Give days and relevant information"}
        ></Title>
        <TourPlan packageInfo={packageInfo}></TourPlan>
      </section>
      <section className="pb-10">
        <Title
          title={`All Tour Guide`}
          subTitle={
            "Click on a tour guide to see details about guide and choose any of guide for your tour"
          }
        ></Title>
        <AllTourGuide></AllTourGuide>
      </section>
      <section id="booking-form" className="pb-10 ">
        <Title
          title={`Booking Form`}
          subTitle={
            "Insert all information for proceed , and make sure you are logged in."
          }
        ></Title>
        <BookingForm packageInfo={packageInfo}></BookingForm>
      </section>
    </div>
  );
};

export default PackageDetails;
