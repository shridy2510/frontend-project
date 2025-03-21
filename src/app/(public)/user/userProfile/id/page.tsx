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
import {updateUser} from "@/app/service/userService/updateUser";
import { useEffect, useState } from "react";
import getUserInfoById from "@/app/service/userService/getUserInfoById";
import {useToast} from "@/hooks/use-toast";
import {Simulate} from "react-dom/test-utils";

import {constants} from "@/constants";

// Form validation schema
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    firstname: z.string(),
    lastname: z.string(),
    phoneNumber: z.string(),
});

export default function UserProfile() {
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
    });

    const { toast } = useToast();
    const userId=localStorage.getItem("User_id")


    // Initialize form with react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: userData, // default values
    });

    useEffect(() => {
        const userId = localStorage.getItem("User_id");
        if (userId) {
            fetchUserData(userId);
        }
    }, []);

    const fetchUserData = async (userId: string) => {
        try {
            const response = await getUserInfoById(userId);
            const data = response.data;
            setUserData({
                userName: data.userName,
                email: data.email,
                firstname: data.firstName,
                lastname: data.lastName,
                phoneNumber: data.phoneNumber,
            });
            // Updating form values when data is fetched
            form.reset({
                username: data.userName,
                email: data.email,
                firstname: data.firstName,
                lastname: data.lastName,
                phoneNumber: data.phoneNumber,
            });
        } catch (error) {


            console.error(error);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await updateUser(userId,values.username, values.email, values.firstname, values.lastname, values.phoneNumber);
            toast({
                description: constants.updateSuccess,
                className: "bg-foreground text-white"
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
                        <CardTitle>User Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Username<span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email<span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
