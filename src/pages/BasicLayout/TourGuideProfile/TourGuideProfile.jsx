import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Title from "../../../components/Title/Title";

const TourGuideProfile = () => {
  const tourGuideInfo = useLoaderData();
  const { name, email, bio, experience, image, ratings } = tourGuideInfo;
  console.log(tourGuideInfo);
  return (
    <div>
      <Helmet>
        <title>GUIDE PROFILE || TOUR NEST</title>
      </Helmet>
      <section>
        <Title
          title={`Tour Guide ${name}`}
          subTitle={`Here is some relevant information about the tour guide_${name}`}
        ></Title>
        <div className="bg-white p-2 md:p-5 rounded-lg relative ">
            <div className="h-[100px] sm:h-[200px] md:h-[250px] lg:h-[350px]  w-[100px] sm:w-[200px] md:w-[250px] lg:w-[350px]  absolute top-0 right-0 mt-2 md:mt-5 mr-2 md:mr-5">
                <img src={image} className="h-full w-full object-cover rounded-lg rounded-bl-[30px] md:rounded-bl-[40px] lg:rounded-bl-[50px]" alt="" />
            </div>
            {/* tour guide info */}
            <div>
                <h3 className="text-xl sm:text-3xl  lg:text-4xl font-bold">{name}</h3>
                <p className="mt-2"><strong>Rating:</strong> {ratings}</p>
                <p className="mt-2 flex flex-col sm:flex-row  gap-2"><strong>Email:</strong> <span>{email}</span></p>
                <p className="mt-2"><strong>BIO:</strong> {bio}</p>
                <p className="mt-2"><strong>Experience:</strong> {experience}</p>

            </div>
        </div>
      </section>
    </div>
  );
};

export default TourGuideProfile;
