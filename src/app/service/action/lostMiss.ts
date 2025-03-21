import axios from "@/axiosConfig";



export  async function changeToLostMissing(id: string){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/Asset/update`;
   return await axios.put(url,{
        id: id,
        status_id: 5,})

}