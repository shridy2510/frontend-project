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
import { v4 as uuidv4 } from 'uuid';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getCompany, getCompanyName} from "@/app/service/companyService/getCompanyName";
import {useQuery} from "@tanstack/react-query";

import AddCompanyModal from "@/app/(admin)/Components/modals/company/company";
import AddModelModal from "@/app/(admin)/Components/modals/model/model";
import {CirclePlus} from "lucide-react";
import {getModel} from "@/app/service/modelService/getList";
import {createAsset} from "@/app/service/AssetService/functions";



const formSchema = z.object({
    serial: z.string(),
    name: z.string().min(1, {
        message: "Asset name is required.",
    }),
    assetTag: z.string().min(1, {
        message: "Asset tag is required.",
    }),


    cost: z.preprocess(
        (val) => {
            if (typeof val === "string") {
                const trimmed = val.trim();
                if (trimmed === "") return undefined; // Allow empty string as valid (interpreted as undefined)

                const cleaned = trimmed.replace(/,/g, ""); // Remove commas from input
                const parsed = parseFloat(cleaned);
                return isNaN(parsed) ? NaN : parsed;
            }
            return val;
        },
        z.number({ invalid_type_error: "Cost must be a number." })
            .positive("Cost must be positive")
            .optional() // Make it optional so empty values are allowed
    ),
    model:z.string(),
    company: z.string(),
    status: z.string(),
    department: z.string(),
    location: z.string()
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
            status: "1",
            cost: "",
            company: "",
            model:"",
            department:"",
            location: ""
        },
    });


    const statuses = [
        { id: 1, status: "Available" },
        { id: 2, status: "Broken" },
        { id: 3, status: "Checked Out" },
        { id: 4, status: "Disposed" },
        { id: 5, status: "Lost / Missing" },
        { id: 6, status: "Under Repair" }
    ];

    //company
    async function fetchCompanyData(){
        try{ const response= await getCompany();
            return response.data;
            }
        catch(error)
        {throw error}

    }
    const [companies, setCompanies]=useState([])
    const getCompanyList= async ()=> {
        const data=await fetchCompanyData();
        setCompanies(data);


    }
    //model
    async function fetchModelData(){
        try{ const response= await getModel();
            return response.data;
        }
        catch(error)
        {throw error}

    }
    const [models, setModels]=useState([])
    const getModelList= async ()=>{
        const data= await fetchModelData();
        setModels(data);
    }




    const onSubmit = async (values) => {
        try {
            await createAsset(values.serial, values.name, values.assetTag, values.status, values.cost,values.model,values.company,values.department,values.location);
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
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 flex items-center gap-2 ">  <CirclePlus size={32}/> Add an Asset</h1>
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
                                                                {...field} autoComplete="off"
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
                                                        <Select onValueChange={(value) => field.onChange(value )} defaultValue={field.value}>
                                                            <FormControl className="flex-1">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Available" />
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
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}
                                                                onOpenChange={open => open && getCompanyList()}>

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
                                            name="model"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Model</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}
                                                                onOpenChange={open => open && getModelList()}
                                                        >
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
                                        <FormField
                                            control={form.control}
                                            name="department"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Department</FormLabel>
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
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Location</FormLabel>
                                                        <FormControl className="flex-1">
                                                            <Input {...field} autoComplete="off"/>
                                                        </FormControl>
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