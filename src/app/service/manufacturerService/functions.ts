import axios from "@/axiosConfig";

export  async function getManufacturer(){
    try {
        return await axios.get(`/Manufacturer/getList`);
    } catch (error) {
        throw error;
    }
}
export async function addManufacturer(name,URL){
    try{
        const url=`${process.env.NEXT_PUBLIC_SERVER}/Manufacturer/create`;
        return await axios.post(url,{
            name: name,
            url: URL||null,
        })
    }catch(error){throw error;}


}