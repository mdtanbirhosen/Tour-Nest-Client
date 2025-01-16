
import TourGuideCard from "../../../../components/TourGuideCard/TourGuideCard";
import useAllTourGuide from "../../../../hooks/useAllTourGuide";

const AllTourGuide = () => {
    const [allTourGuide]= useAllTourGuide()
    console.log(allTourGuide)
    return (
        <div className="bg-white p-2 md:p-5 rounded-lg">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allTourGuide.map(tourGuide=><TourGuideCard key={tourGuide._id} tourGuide={tourGuide}></TourGuideCard>)}
            </div>
        </div>
    );
};

export default AllTourGuide;