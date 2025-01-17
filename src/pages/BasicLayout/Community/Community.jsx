import { Helmet } from "react-helmet-async";
import Title from "../../../components/Title/Title";
import useAllStories from "../../../hooks/useAllStories";
import StoryCard from "../../../components/StoryCard/StoryCard";

const Community = () => {
  const [allStories] = useAllStories();
  console.log(allStories);
  return (
    <div>
      <Helmet>
        <title>Community || TOUR NEST</title>
      </Helmet>
      <section className="pb-10">
        <div>
          <Title
            title="Tourist Community"
            subTitle={
              "All stories of tourist and guides what they are added. You can share the stories via Facebook.for share stories make sure you are logged in."
            }
          ></Title>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 bg-white p-2 md:p-5 rounded-lg">
          {
            allStories?.map(story =><StoryCard key={story._id} story={story}></StoryCard>)
          }
        </div>
      </section>
    </div>
  );
};

export default Community;
