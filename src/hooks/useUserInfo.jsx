import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserInfo = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();
    const {data:userInfo, isLoading} = useQuery({
        queryKey:['user-info'],
        queryFn: async()=>{
            const res = await axiosSecure(`/user/${user?.email}`)
            return res.data
        }
    })

    return [userInfo, isLoading]
};

export default useUserInfo;