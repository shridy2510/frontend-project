"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import Link from "next/link";

import {useEffect, useRef, useState} from "react";
import {router} from "next/client";
import {useRouter} from "next/navigation";

import {AxiosResponse} from "axios";
import getUserInfo from "@/app/service/userService/getUserInfo";
import {constants} from "@/constants";
import login from "@/app/service/userService/login";






export default function LoginForm(){
    const router = useRouter();

    const  [username, setUserName]=useState("")
    const  [password, setPassword]=useState("")

    const [errormsg, setErrorMsg]= useState("")




    useEffect(() => {
        setErrorMsg('')
    }, [username,password]);
    const [errorState, setErrorState]= useState(false)






    async function handleLoginPage() {


        const response=await login(username,password);
        if(username==='' || password===''){setErrorMsg(`${constants.noUserNameOrPassword}`);
            setErrorState(true)}
        else if(response===401){setErrorMsg(`${constants.loginUnsuccessfull}`);
            setErrorState(true)}
        else if(response===200){
            setErrorState(false);
            setUserName('');
            setPassword('');
            const responseUser:AxiosResponse = await getUserInfo(username)
            if(responseUser === 401){
                setErrorState(true)
                setErrorMsg(`${constants.loginUnsuccessfull}`)
            }
            localStorage.setItem("User_id",responseUser.data.userId)

            if(responseUser.data.roles.includes("Admin")){router.push('/dashboard');}
            else{router.push('/userPage');}



        }



    }








    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB]">
            <Card className="mx-auto lg:w-96 p-6"> {/* Increased width and padding */}
                <div className="flex justify-center mb-4"> {/* Centered image on top */}
                    <img src="/assets/ITAM.svg" alt="itam" className="h-18 w-32"/>
                </div>
                <div className="flex justify-center mb-4 text-[#016853]">
                    <span className="text-sm font-light text-muted-foreground text-[#016853]">IT Asset Management Application</span>
                </div>
                <CardHeader>
                    <CardTitle className="text-3xl">Login</CardTitle> {/* Larger title */}
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6"> {/* Increased gap */}
                        <div className="grid gap-3"> {/* Increased gap */}
                            <Label htmlFor="emailUsername">Username or Email</Label>
                            <Input
                                id="emailUsername"
                                type="text"
                                placeholder=""
                                required
                                value={username}
                                onChange={(event) => setUserName(event.target.value)}
                                className={`border ${errorState ? 'border-red-500' : ''}`}
                            />
                        </div>
                        <div className="grid gap-3"> {/* Increased gap */}
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className={`border ${errorState ? 'border-red-500' : ''}`}
                            />
                        </div>
                        <div>
                            <p className="ml-auto inline-block text-sm text-red-500">{errormsg}</p>
                        </div>
                        <Button type="submit" className="w-full " onClick={handleLoginPage}>
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

    )


}