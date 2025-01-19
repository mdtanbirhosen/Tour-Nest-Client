import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import StoryCard from "../../../../components/StoryCard/StoryCard";

const TouristStory = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic()

  // Fetch random stories
  const {data:randomStories = []} = useQuery({
    queryKey:['random-stories'],
    queryFn: async()=>{
        const res = await axiosPublic('/stories?random=true');
        return res.data
    }
  })
  console.log(randomStories)
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {randomStories.map((story) => (
          <StoryCard key={story._id} story={story}></StoryCard>
        ))}
      </div>
      <div className="mt-8 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => navigate("/community")}
        >
          All Stories
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          onClick={() => navigate("/dashboard/touristDashboard/addStories")}
        >
          Add Stories
        </button>
      </div>
    </div>
  );
};

export default TouristStory;
