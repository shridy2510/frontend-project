import React from "react";
import LoginForm from "@/app/(auth)/login/components/loginForm";

export default function AuthLayout({children}:{ children: React.ReactNode }){
    return(
    <div> {children}</div>
    )

}