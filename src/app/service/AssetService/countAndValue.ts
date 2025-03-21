import axios from "@/axiosConfig";

export  async  function  getTotalAvailableAsset(){
    try {
        return await axios.get(`/Asset/total/Available`);
    } catch (error) {
        throw error;
    }
}
export  async  function  getTotalAsset(){
    try {
        return await axios.get(`/Asset/total`);
    } catch (error) {
        throw error;
    }
}
export  async  function  getAssetCost(){
    try {
        return await axios.get(`/Asset/TotalCost`);
    } catch (error) {
        throw error;
    }
}
export  async  function  getTotalAssetAlerts(){
    try {
        return await axios.get(`/Asset/Count/Alert`);
    } catch (error) {
        throw error;
    }
}


