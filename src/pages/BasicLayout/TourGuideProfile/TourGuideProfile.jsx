import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Title from "../../../components/Title/Title";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import StoryCard from "../../../components/StoryCard/StoryCard";

const TourGuideProfile = () => {
  const tourGuideInfo = useLoaderData();
  const { name, email, bio, experience, image, ratings } = tourGuideInfo;
  const axiosPublic = useAxiosPublic();

  const { data: specificStories = [] } = useQuery({
    queryKey: ["specific-stories"],
    queryFn: async () => {
      const res = await axiosPublic(`/stories?email=${email}`);
      return res.data;
    },
  });
  console.log(specificStories);
  console.log(tourGuideInfo);
  return (
    <div>
      <Helmet>
        <title>GUIDE PROFILE || TOUR NEST</title>
      </Helmet>
      <section className="mb-10">
        <Title
          title={`Tour Guide ${name}`}
          subTitle={`Here is some relevant information about the tour guide_${name}`}
        ></Title>
        <div className="bg-white p-2 md:p-5 rounded-lg relative ">
          <div className="card lg:card-side  ">
            <figure className=" lg:w-1/2">
              <img
                className="h-full w-full object-cover"
                src={image}
                alt="Album"
              />
            </figure>
            <div className="card-body">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                {name}
              </h2>
              <p>
                <strong> Guide Email: </strong>
                {email}
              </p>
              <p>
                <strong> BIO: </strong>
                {bio}
              </p>
              <p>
                <strong> Experience: </strong>
                {experience}
              </p>
              <p>
                <strong> Rating: </strong>
                {ratings}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <Title title={`${name}'s stories`} subTitle={'slide to see more..'}></Title>
        {specificStories ? (
          
        <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-3">
          {specificStories?.map(story=><StoryCard key={story._id} story={story}></StoryCard>)}
        </div>
        ) : (
          <div>There are no stories available</div>
        )}
      </section>
    </div>
  );
};

export default TourGuideProfile;
