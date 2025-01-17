import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPackages = () => {
    const axiosPublic = useAxiosPublic();

    const { data: allPackages = [] , isLoading} = useQuery({
      queryKey: ["packages-random"],
      queryFn: async () => {
        const res = await axiosPublic("/packages");
        return res.data;
      },
    });
    console.log(isLoading)
    return [allPackages,isLoading]
};

export default useAllPackages;