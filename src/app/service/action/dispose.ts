import axios from "@/axiosConfig";

export  async function changeToDisposed(id: string){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/Asset/update`;
    try{ return await axios.put(url,{
        id: id,
        status_id: 4,

    })}catch(error){
        console.error("error:",error)
        return null;

    }
}