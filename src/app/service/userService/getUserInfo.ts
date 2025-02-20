import axios from '@/axiosConfig';


export default async function getUserInfo(input){
    try {
        return await axios.get(`/getUserInfo?input=${input}`);
    } catch (error) {
        throw error;
    }



}
