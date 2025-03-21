
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useToast} from "@/hooks/use-toast";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createAsset} from "@/app/service/AssetService/functions";
import {addCompany} from "@/app/service/companyService/getCompanyName";

export default function AddCompanyModalInSetUp(){

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Company name is required.",
        }),
        address: z.string()
    });

    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
        },
    });
    const onSubmit = async (values) => {
        try {
            await addCompany(values.name,values.address);
            toast({
                description: "Company created successfully!",
                className: "bg-foreground text-white",
            });
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                description: "An error occurred while creating Company.",
            });
            console.error(error);
        }
    };


    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex bg-[#1E7B56]">
                    <Plus size={40} />
                    Add New Company
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new Company</DialogTitle>
                    <DialogDescription>
                        Enter the data in the fields below and we will add it to your list.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex-1 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">
                                                    Name <span className="text-red-500 ml-1">*</span>
                                                </FormLabel>
                                                <FormControl className="flex-1">
                                                    <Input {...field} autoComplete="off" />
                                                </FormControl>
                                            </div>
                                            <FormMessage  />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">
                                                    Address
                                                </FormLabel>
                                                <FormControl className="flex-1">
                                                    <Input {...field} autoComplete="off" />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>)


}