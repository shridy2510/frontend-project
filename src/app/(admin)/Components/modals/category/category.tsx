
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {addCategory} from "@/app/service/categoryService/functions";

export default function AddCategoryModal(){
    const types=[{name:"Accessory",id:1},{name:"Component",id:2},{name:"Asset",id:3},{name:"Consumable",id:4},{name:"License",id:5}]

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Company name is required.",
        }),
        type: z.string()
    });

    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "",
        },
    });
    const onSubmit = async (values) => {
        try {
            await addCategory(values.name,values.type);
            toast({
                description: "Category created successfully!",
                className: "bg-foreground text-white",
            });
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                description: "An error occurred.",
            });
            console.error(error);
        }
    };


    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex bg-[#1E7B56]">
                    <Plus size={40}/>
                    Add New Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new Category</DialogTitle>
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
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">Type</FormLabel>
                                                <Select onValueChange={(value) => field.onChange(value )} defaultValue={field.value}>
                                                    <FormControl className="flex-1">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {types.map((type) => (
                                                            <SelectItem key={type.id} value={type.name}>
                                                                {type.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage/>
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