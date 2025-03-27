import axios from "@/axiosConfig";

export  async function changeToAFromCheckIn(id){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/Asset/checkIn`;
 return await axios.put(url,{
        id: id,
        status_id: 1,
    })
}