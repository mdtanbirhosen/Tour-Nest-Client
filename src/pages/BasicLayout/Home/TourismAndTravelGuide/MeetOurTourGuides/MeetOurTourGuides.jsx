import { useQuery } from "@tanstack/react-query";
import TourGuideCard from "../../../../../components/TourGuideCard/TourGuideCard";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const MeetOurTourGuides = () => {
    const axiosPublic = useAxiosPublic()

    const{data:randomGuides = []} = useQuery({
        queryKey:['random-guides'],
        queryFn: async()=>{
            const res = await axiosPublic('/tourGuides?random=true')
            return res.data
        }
    })
    console.log(randomGuides)
    return (
        <div className="mt-10">
            <div className="grid lg:grid-cols-2  gap-5">
            {randomGuides.map((randomGuide)=><TourGuideCard key={randomGuide._id} randomGuide={randomGuide}></TourGuideCard>)}
            </div>
        </div>
    );
};

export default MeetOurTourGuides;