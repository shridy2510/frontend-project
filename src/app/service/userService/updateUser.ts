import axios from '@/axiosConfig';

export  async function updateUser(userId: string,userName: string, email: string, firstName: string, lastName:string, number:string){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/update/users`;
    try{ return await axios.put(url,{
        userName: userName,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: number,
        userId: userId

    })}catch(error){
        throw(error.response)

    }
}
export  async function changePassword(userId: string,password: string){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/changePassword`;
    try{ return await axios.put(url,{
        password: password,
        userId: userId,
 

    })}catch(error){
        throw(error.response)

    }
}