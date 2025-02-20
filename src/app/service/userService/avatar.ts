import axios from '@/axiosConfig';
import FormData from 'form-data';

export async function saveAvatar(Data: FormData,userId:string){}
    try{

        await axios.put(`/saveAvatar?UserId=${userId}`,Data,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })




}catch (e) {

    }
)