import axios from "@/axiosConfig";

export  async function getPieChartData(){
    try {
        return await axios.get(`/Asset/TotalByStatus`);
    } catch (error) {
        throw error;
    }
}