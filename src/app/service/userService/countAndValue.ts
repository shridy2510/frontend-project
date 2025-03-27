import axios from "@/axiosConfig";

export  async  function  getTotalUser(){
    try {
        return await axios.get(`/total/users`);
    } catch (error) {
        throw error;
    }
}
export  async  function  getUsers(){
        return await axios.get(`/list/users`);

}
export async  function getIdFromUserId(userId){

    return await axios.get(`/id/user/get?userId=${userId}`)
}
