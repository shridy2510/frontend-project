import axios from "@/axiosConfig";



export  async function changeToCheckedOut(id, userId,lastCheckout:Date,expectedCheckin:Date,location){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/Asset/update`;
    return await axios.put(url,{
        id: id,
        status_id: 3,
        assignedUser_id: userId,
        lastCheckout:lastCheckout,
        expectedCheckin:expectedCheckin,
        location: location


    })
}