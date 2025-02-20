"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import login from "@/app/login/loginHandler";
import {useEffect, useRef, useState} from "react";
import {router} from "next/client";
import {useRouter} from "next/navigation";




export default function LoginForm(){
    const router = useRouter();

    const  [username, setUserName]=useState("")
    const  [password, setPassword]=useState("")

    const [errormsg, setErrorMsg]= useState("")

    useEffect(() => {
        setErrorMsg('')
    }, [username,password]);
    const [errorState, setErrorState]= useState(false)





    async function handleLogin() {


        const response=await login(username,password);
        if(username==='' || password===''){setErrorMsg(`${process.env.NEXT_PUBLIC_NO_USERNAME_OR_PASSWORD}`);
            setErrorState(true)}
        else if(response===401){setErrorMsg(`${process.env.NEXT_PUBLIC_ERROR401}`);
            setErrorState(true)}
        else if(response===200){
            setErrorState(false);
            setUserName('');
            setPassword('');
            router.push('/dashboard');

        }



    }








    return (
        <div className="min-h-screen flex items-center justify-center">

        <Card className="mx-auto  lg:w-80 ">
            <CardHeader >
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>

                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="emailUsername">Username or Email</Label>
                        <Input
                            id="emailUsername"
                            type="text"
                            placeholder=""
                            required

                            value={username}
                            onChange={(event) => {
                                setUserName(event.target.value);


                            }}
                            className={`border ${errorState ? 'border-red-500' : ''}`}

                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>

                        <Input id="password" type="password"
                               required
                               value={password}
                               onChange={(event) => {
                                   setPassword(event.target.value);
                               }}
                               className={`border ${errorState ? 'border-red-500' : ''}`}
                        />
                    </div>
                    <div>
                        <p className="  ml-auto inline-block text-sm  sm:text-red-500">{errormsg}</p>


                    </div>
                    <Button type="submit" className="w-full" onClick={handleLogin}>
                        Login
                    </Button>


                </div>

            </CardContent>
        </Card>
        </div>
    )


}