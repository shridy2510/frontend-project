"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {changePassword, updateUser} from "@/app/service/userService/updateUser";
import { useEffect, useState } from "react";
import getUserInfoById from "@/app/service/userService/getUserInfoById";
import {toast, useToast} from "@/hooks/use-toast";
import {Simulate} from "react-dom/test-utils";

import {constants} from "@/constants";

// Form validation schema

const formSchema = z.object({
    newPassword: z.string()
        .min(2, { message: "Password must be at least 2 characters long." })
        .max(32, { message: "Password must not exceed 32 characters." }),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"], // Error path
    message: "Passwords do not match.", // Error message
});

export default function PasswordForm() {


    const { toast } = useToast();
    const userId=localStorage.getItem("User_id")


    // Initialize form with react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword:"",
            confirmPassword:""
        }, // default values
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            await changePassword(userId,values.confirmPassword);
            toast({
                description: constants.updateSuccess,
                className: "bg-foreground text-white"}
            )
            form.reset({
                newPassword:"",
                confirmPassword:""
            })
        } catch (err) {

            toast({
                variant: "destructive",
                description: constants.updateError
            })
            console.error(err);
        }
    };

    return (
        <div className="content p-8">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6">User Profile</h1>
            <div className="ml-16 mr-24">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                New Password<span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password <span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="bt-18">
                                    Save
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
