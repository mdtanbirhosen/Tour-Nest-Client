import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://tour-nest-server-side.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;