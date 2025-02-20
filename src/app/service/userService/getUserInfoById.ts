import axios from '@/axiosConfig';




export default async function getUserInfoById(userId){
    try {
        return await axios.get(`/getUserInfo/userId?UserId=${userId}`);
    } catch (error) {
        throw error;
    }



}