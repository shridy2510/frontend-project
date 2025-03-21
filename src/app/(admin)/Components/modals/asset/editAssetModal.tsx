import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { toast, useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createAsset,
    getAssetById,
    updateAsset,
    viewAsset,
} from "@/app/service/AssetService/functions";
import { addCompany, getCompany } from "@/app/service/companyService/getCompanyName";
import { addModel, getModel } from "@/app/service/modelService/getList";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function EditAssetModal({ id }) {
    // Dialog open state
    const [open, setOpen] = useState(false);

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Asset name is required.",
        }),
        assetTag: z.string().min(1, {
            message: "Asset Tag is required.",
        }),
        serial: z.string(),
        model_id: z.string(),
        company_id: z.string(),
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
            z
                .number({ invalid_type_error: "Cost must be a number." })
                .positive("Cost must be positive")
                .optional() // Make it optional so empty values are allowed
        ),
    });

    const [assetData, setAssetData] = useState({
        assetTag: "",
        name: "",
        serial: "",
        model_id: "",
        company_id: "",
        cost: "",
    });

    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: assetData,
    });

    const onSubmit = async (values) => {
        try {
            await updateAsset(
                id,
                values.assetTag,
                values.name,
                values.serial,
                Number(values.model_id),
                Number(values.company_id),
                values.cost
            );
            toast({
                description: "Update Asset successfully!",
                className: "bg-foreground text-white",
            });
            form.reset();
            // Close the dialog after a successful submit
            setOpen(false);
        } catch (error) {
            toast({
                variant: "destructive",
                description: "An error occurred while updating",
            });
            console.error(error);
        }
    };

    // Fetch asset data
    const getAssetData = async () => {
        try {
            const response = await getAssetById(id);
            const data = response.data;
            // Replace null values with empty strings
            const processedData = {
                assetTag: data.assetTag || "",
                name: data.name || "",
                serial: data.serial || "",
                model_id: data.model_id !== null ? data.model_id : "",
                company_id: data.company_id != null ? data.company_id : "",
                cost: data.cost !== null ? data.cost.toString() : "",
            };
            setAssetData(processedData);
        } catch (error) {
            console.error("Error fetching asset data:", error);
        }
    };

    useEffect(() => {
        form.reset(assetData);
        console.log(assetData);
    }, [assetData, form]);

    // Company fetching
    async function fetchCompanyData() {
        try {
            const response = await getCompany();
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    const [companies, setCompanies] = useState([]);
    const getCompanyList = async () => {
        const data = await fetchCompanyData();
        setCompanies(data);
    };

    // Model fetching
    async function fetchModelData() {
        try {
            const response = await getModel();
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    const [models, setModels] = useState([]);
    const getModelList = async () => {
        const data = await fetchModelData();
        setModels(data);
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (isOpen) {
                // Load asset data when dialog opens
                getAssetData();
            }
        }}>
            <DialogTrigger asChild>
        <span className="flex items-center gap-2">
          <Pencil color="#7796CB" /> Edit
        </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Asset</DialogTitle>
                    <DialogDescription>
                        Enter the data in the fields below and we will edit it.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex-1 space-y-4">
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
                                                    <Input {...field} autoComplete="off" />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="company_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">Company</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                    onOpenChange={(open) => open && getCompanyList()}
                                                >
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
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="model_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">Model</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                    onOpenChange={(open) => open && getModelList()}
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
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cost"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">Cost</FormLabel>
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
        </Dialog>
    );
}
