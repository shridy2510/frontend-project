import axios from "@/axiosConfig";

export  async function getModel(){
    try {
        return await axios.get(`/Model/getList`);
    } catch (error) {
        throw error;
    }
}

export async function addModel(name,categoryID,manufacturerID,model_number,description){
    try{
        const url=`${process.env.NEXT_PUBLIC_SERVER}/Model/create`;
        return await axios.post(url,{
            name: name,
            categoryID: categoryID,
            manufacturerID: manufacturerID ||null,
            model_number: model_number ||null,
            description: description ||null,
        })
    }catch(error){throw error;}


}
