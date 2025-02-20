import axios from '@/axiosConfig';
import {type} from "node:os";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;



export default async function createUser(userName: string,
                                         email: string,
                                         password:string,
                                         firstName: string,
                                         lastName: string,
                                         phoneNumber: string,
                                         role: string){
    const url=`${process.env.NEXT_PUBLIC_SERVER}/create/user`;
    try{ return await axios.post(url,
        {
            userName: userName,
            email: email,
            password:password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            roles: [ role]
        }
        )}catch(error){
        throw(error.response)

    }









}