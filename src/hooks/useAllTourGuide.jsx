import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllTourGuide = () => {
    const axiosPublic = useAxiosPublic()
    
        const{data:allTourGuide = [],isLoading} = useQuery({
            queryKey:['guides'],
            queryFn: async()=>{
                const res = await axiosPublic('/tourGuides')
                return res.data
            }
        })
    return [allTourGuide,isLoading]
};

export default useAllTourGuide;