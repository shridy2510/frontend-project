
import axios from "@/axiosConfig";
import keycloakConfig from "@/app/keycloak.config";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {router} from "next/client";


export default async function login (username:string, password: string)
{

    const token_endpoint = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', `${keycloakConfig.client_id}`);
    params.append('username', `${username}`);
    params.append('password', `${password}`);


    try{

        const response= await axios.post(token_endpoint,params)
        const access_token= response.data.access_token;
        const refresh_token= response.data.refresh_token;
        Cookies.set('access_token', access_token, { expires: 7 });
        Cookies.set('refresh_token', refresh_token, { expires: 7 })
        axios.defaults.headers.common = {'Authorization': `Bearer ${access_token}`}

        return response.status;

    }
    catch(error){
        return error.response.status;


        }


}


