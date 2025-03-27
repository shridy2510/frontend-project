import axios from '@/axiosConfig';

export  async function requestCheckedOut(id, userId,expectedCheckout:Date,expectedCheckin:Date,location){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/request/checkOut`;
    return await axios.post(url,{
        assetId: id,
        userId: userId,
        expectedCheckout:expectedCheckout,
        expectedCheckin:expectedCheckin,
        location: location||null,
        requestType: "check out"
    })
}
export  async function requestCheckedIn(id){
    const userId= localStorage.getItem("User_id")
    const url=`${process.env.NEXT_PUBLIC_SERVER}/request/checkIn`;
    return await axios.post(url,{
        assetId: id,
        userId: userId,
        requestType: "check in"
    })
}

export  async function getRequestUserAssett(){
    try {
        return await axios.get(`/RequestedAssets/User/getList`);
    } catch (error) {
        throw error;
    }
}
export  async function rejectRequestUserAsset(id){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/deny`;
    const userId=localStorage.getItem("User_id")
    return await axios.post(url,{
        id: id,
        adminId: userId,
    })
}
export  async function acceptRequestUserAsset(id){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/accept`;
    const userId=localStorage.getItem("User_id")
    return await axios.post(url,{
        id: id,
        adminId: userId,
    })
}
export  async function getPendingRequestAsset(){
        return await axios.get(`/RequestedAssets/getPendingList`);
}
export  async  function  getCountPendingRequest(){
        return await axios.get(`/RequestedAssets/Count/Pending`);

}
export  async function getRequestAsset(){
    return await axios.get(`/RequestedAssets/getList`);
}
export  async function updateRequestCheckIn(id){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/update/request/checkIn`;
    return await axios.put(url,{
        id: id
    })
}
