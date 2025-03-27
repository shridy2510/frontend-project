
import axios from '@/axiosConfig';
import {Asset} from "next/dist/compiled/@next/font/dist/google";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
export async function createAsset(serial:string, name:string, assetTag:string, status:number, cost:number, model:number,company:number ,department:string,location: string){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/Asset/create`;
    try{ return await axios.post(url,
        {
            status_id: status||null,
            company_id: company||null,
            assetTag: assetTag,
            name: name,
            serial: serial||null,
            model_id: model||null,
           cost:  cost||null,
            department: department ||null,
            location: location ||null
        }
    )}catch(error){
        throw(error.response)
    }
}
export async function updateAsset(id,assetTag, name,serial, model_id, company_id,cost ,department,location){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/Asset/update`;
    try{ return await axios.put(url,
        {
            id: id,
            assetTag: assetTag,
            name: name,
            serial: serial||null,
            model_id: model_id||null,
            company_id: company_id||null,
            cost: cost||null,
            department: department||null,
            location: location|| null

        }
    )}catch(error){
        throw(error.response)
    }
}
export  async function getAsset(){
    try {
        return await axios.get(`/Asset/getList`);
    } catch (error) {
        throw error;
    }
}
export  async function getAvailableAsset(){
    try {
        return await axios.get(`/Asset/Available`);
    } catch (error) {
        throw error;
    }
}
export  async function getBrokenAsset(){
    try {
        return await axios.get(`/Asset/Broken`);
    } catch (error) {
        throw error;
    }
}
export  async function getCheckedOutAsset(){
    try {
        return await axios.get(`/Asset/CheckedOut`);
    } catch (error) {
        throw error;
    }
}
export  async function getDisposedAsset(){
    try {
        return await axios.get(`/Asset/Disposed`);
    } catch (error) {
        throw error;
    }
}
export  async function getLostMissingAsset(){
    try {
        return await axios.get(`/Asset/LostMissing`);
    } catch (error) {
        throw error;
    }
}
export  async function getUnderRepairedAsset(){
    try {
        return await axios.get(`/Asset/UnderRepair`);
    } catch (error) {
        throw error;
    }
}
export  async function getDueAsset(){
    try {
        return await axios.get(`/Asset/DueDate`);
    } catch (error) {
        throw error;
    }
}
export async function viewAsset(id){
        return await axios.get(`/Asset/View?id=${id}`);

}
export async function getAssetById(id){
    return await axios.get(`/Asset/Get?id=${id}`);

}
export async function getAssetByUserId(){
    return await axios.get(`/Asset/User/getList`);

}


