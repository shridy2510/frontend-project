import axios from "@/axiosConfig";

export  async function getCategory(){
    try {
        return await axios.get(`/Category/getList`);
    } catch (error) {
        throw error;
    }
}
export async function addCategory(name,type){
    try{
        const url=`${process.env.NEXT_PUBLIC_SERVER}/Category/create`;
        return await axios.post(url,{
            name: name,
            type: type||null,
        })
    }catch(error){throw error;}


}