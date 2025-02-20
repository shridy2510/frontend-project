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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {constants} from "@/constants";
import createUser from "@/app/service/userService/createUser";


// Form validation schema
const formSchema = z.object({
    newUserName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    newEmail: z.string().email({
        message: "Invalid email address.",
    }),

    firstname: z.string(),
    lastname: z.string(),
    phoneNumber: z.string(),
    newPassword: z.string()
        .min(2, { message: "Password must be at least 2 characters long." })
        .max(32, { message: "Password must not exceed 32 characters." }),
    confirmPassword: z.string(),
    role: z.enum(["Admin","User"], {
        required_error: "You need to select a role."})
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"], // Error path
    message: "Passwords do not match.", // Error message
});

export default function UserProfile() {
    const [userData, setUserData] = useState({
        newUserName: "",
        newEmail: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        newPassword:"",
        confirmPassword:"",
        role:"User"

    });

    const { toast } = useToast();
    const [errormsg, setErrorMsg]= useState("")


    // Initialize form with react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: userData, // default values
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await createUser(values.newUserName, values.newEmail,values.confirmPassword,values.firstname, values.lastname, values.phoneNumber,values.role);
            toast({
                description: constants.createSuccess,
                className: "bg-foreground text-white"
            })
            form.reset({
                newUserName: "",
                newEmail: "",
                firstname: "",
                lastname: "",
                phoneNumber: "",
                newPassword:"",
                confirmPassword:"",
                role:"User"

            })
            setErrorMsg("")
        } catch (error) {
            if(error.status === 409){
                toast({
                    variant: "destructive",
                    description: constants.existedUserName
                });
                setErrorMsg(constants.existedUserName)

            }
            else{
                toast({
                    variant: "destructive",
                    description: constants.updateError
                })
                console.error(error);
            }


        }
    };

    return (
        <div className="content p-8">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6">User Profile</h1>
            <div className="ml-16 mr-24">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Create new User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="newUserName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Username<span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="off"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newEmail"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email<span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} autoComplete="off" />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                New Password<span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" autoComplete="off"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password <span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({field}) => (
                                        <FormItem >
                                            <FormLabel  >Title<span className="text-red-500 ml-1">*</span></FormLabel>
                                            <FormControl>
                                                <RadioGroup

                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Admin"/>
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Admin
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="User"/>
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            User
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="bt-18">
                                    Save
                                </Button>
                                <div>
                                    <p className="  ml-auto inline-block text-sm  sm:text-red-500">{errormsg}</p>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>)
}
