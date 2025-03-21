import axios from '@/axiosConfig';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;




export  async function getCompany(){
    try {
        return await axios.get(`/Company/getList`);
    } catch (error) {
        throw error;
    }
}
export async function  getCompanyName(){
    try {
        return await axios.get(`/Company/getNameList`);
    } catch (error) {
        throw error;
    }
}

export async function addCompany(name,address){
    try{
        const url=`${process.env.NEXT_PUBLIC_SERVER}/Company/create`;
        return await axios.post(url,{
            name: name,
            address: address||null,
        })
    }catch(error){throw error;}


}
