import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


export const metadata: Metadata = {
    title: "App",
    description: "app",
};
const queryClient = new QueryClient();
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html >
        <body >


        {children}


        </body>

        </html>
    );
}


