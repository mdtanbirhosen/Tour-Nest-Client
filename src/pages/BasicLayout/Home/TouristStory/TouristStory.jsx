import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

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
      <h2 className="text-2xl font-bold mb-6">Random Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* {stories.map((story) => (
          
        ))} */}
      </div>
      <div className="mt-8 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => navigate("/allStories")}
        >
          All Stories
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          onClick={() => navigate("/addStories")}
        >
          Add Stories
        </button>
      </div>
    </div>
  );
};

export default TouristStory;
