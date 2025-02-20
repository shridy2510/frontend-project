import axios from '@/axiosConfig';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;


export  async function getCompany(){
    try {
        return await axios.get(`/Company/getList`);
    } catch (error) {
        throw error;
    }
}
