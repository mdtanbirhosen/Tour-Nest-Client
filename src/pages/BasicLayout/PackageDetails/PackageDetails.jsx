import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import PackageGallery from "./PackageGallery/PackageGallery";
import Title from "../../../components/Title/Title";
import AboutTourPackage from "./AboutTourPackage/AboutTourPackage";

const PackageDetails = () => {
  const packageInfo = useLoaderData();
  console.log(packageInfo);
  return (
    <div>
      <Helmet>
        <title>DETAILS || TOUR NEST</title>
      </Helmet>
      <section className="py-5">
        <Title
          title={`Gallery of ${packageInfo?.name}`}
          
        ></Title>
        <PackageGallery
          images={packageInfo?.images}
          name={packageInfo?.name}
        ></PackageGallery>
      </section>
      <section className="pb-10">
        <Title title={`About ${packageInfo.name} Tour`}></Title>
        <AboutTourPackage packageInfo={packageInfo}></AboutTourPackage>
      </section>
    </div>
  );
};

export default PackageDetails;
