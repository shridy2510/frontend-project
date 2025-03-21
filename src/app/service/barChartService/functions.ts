import axios from "@/axiosConfig";

export  async function getBarChartData(){
    try {
        return await axios.get(`/Asset/TotalCostByStatus`);
    } catch (error) {
        throw error;
    }
}