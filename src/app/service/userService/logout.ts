import Cookies from "js-cookie";
import keycloakConfig from "@/app/keycloak.config";

import {useRouter} from "next/navigation";
import {router} from "next/client";
import axios from "@/axiosConfig";



export default async function logout(){

    const refresh_token:string= Cookies.get('refresh_token') as string
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    axios.defaults.headers.common['Authorization'] = '';

    const logout_url=`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout`;
    const params = new URLSearchParams();
    params.append('client_id', `${keycloakConfig.client_id}`);
    params.append('refresh_token', refresh_token);
    await axios.post(logout_url,params
    )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            throw(error.response)})







}
