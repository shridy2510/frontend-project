"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getCompany} from "@/app/service/companyService/getCompanyName";
import {useQuery} from "@tanstack/react-query";

import AddCompanyModal from "@/app/(admin)/Components/modals/company/company";
import AddModelModal from "@/app/(admin)/Components/modals/model/model";


const formSchema = z.object({
    serial: z.string(),
    name: z.string().min(1, {
        message: "Asset name is required.",
    }),
    assetTag: z.string().min(1, {
        message: "Asset tag is required.",
    }),
    status: z.string().min(1, {
        message: "Status is required.",
    }),
    cost: z.number(),
    company:z.string().min(1, {
        message: "Company is required.",
    }),
});

export default function AssetForm() {
    const { toast } = useToast();
    const [errormsg, setErrorMsg] = useState("");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serial: "",
            name: "",
            assetTag: "",
            status: "",
            cost: 0.0,
        },
    });


    const statuses = [
        { id: 1, status: "Available" },
        { id: 2, status: "Broken" },
        { id: 3, status: "Checked Out" },
        { id: 4, status: "Checked In" },
        { id: 5, status: "Disposed" },
        { id: 6, status: "Donated" },
        { id: 7, status: "Lost / Missing" },
        { id: 8, status: "Leased" },
        { id: 9, status: "Under Repair" }
    ];
    const companies = [
        { id: 1, name: "Company1" },
        { id: 2, name: "Company2" },

    ];
    const models = [
        { id: 1, name: "Model1" },
        { id: 2, name: "Model2" },

    ];


    async function fetchCompanyData(){
        try{ const response= await getCompany();
            return response.data;}
        catch(error)
        {throw error}


    }


    const onSubmit = async (values) => {
        try {
            // Assuming `createAsset` is defined elsewhere
            await createAsset(values.serial, values.name, values.assetTag, values.status, values.cost);
            toast({
                description: "Asset created successfully!",
                className: "bg-foreground text-white",
            });
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                description: "An error occurred while creating the asset.",
            });
            console.error(error);
        }
    };

    return (
        <div className="content p-8">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6">Add an Asset</h1>
            <div className="ml-16 mr-24">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle>Asset Details</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                                            Asset Name <span className="text-red-500 ml-1">*</span>
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
                                            name="assetTag"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">
                                                            Asset Tag <span className="text-red-500 ml-1">*</span>
                                                        </FormLabel>
                                                        <FormControl className="flex-1">
                                                            <Input {...field} autoComplete="off" />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="serial"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Serial</FormLabel>
                                                        <FormControl className="flex-1">
                                                            <Input {...field} autoComplete="off"/>
                                                        </FormControl>
                                                    </div>
                                                        <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="cost"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Cost (VND)</FormLabel>
                                                        <FormControl className="flex-1">
                                                            <Input
                                                                {...field}
                                                                type="number"
                                                                step="0.01"
                                                                min="0.00"
                                                                placeholder="0.00"
                                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} // Ensure the value is a number
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl className="flex-1">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a status" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {statuses.map((status) => (
                                                                    <SelectItem key={status.id} value={String(status.id)}>
                                                                        {status.status}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Company</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl className="flex-1">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a company" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {companies.map((company) => (
                                                                    <SelectItem key={company.id} value={String(company.id)}>
                                                                        {company.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <AddCompanyModal/>
                                                    </div>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="serial"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Model</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl className="flex-1">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a model" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {models.map((model) => (
                                                                    <SelectItem key={model.id} value={String(model.id)}>
                                                                        {model.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <AddModelModal/>

                                                    </div>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="bt-18">
                                    Save
                                </Button>

                                {errormsg && <p className="ml-auto inline-block text-sm sm:text-red-500">{errormsg}</p>}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}