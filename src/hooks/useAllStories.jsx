import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllStories = () => {
    const axiosPublic = useAxiosPublic()
    
    const{data:allStories = [],isLoading} = useQuery({
        queryKey:['guides'],
        queryFn: async()=>{
            const res = await axiosPublic('/stories')
            return res.data
        }
    })
return [allStories,isLoading]
};

export default useAllStories;