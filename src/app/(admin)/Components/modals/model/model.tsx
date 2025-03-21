
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
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createAsset} from "@/app/service/AssetService/functions";
import {addCompany, getCompany} from "@/app/service/companyService/getCompanyName";
import {addModel, getModel} from "@/app/service/modelService/getList";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {getCategory} from "@/app/service/categoryService/functions";
import {getManufacturer} from "@/app/service/manufacturerService/functions";

export default function AddModelModal(){

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Model name is required.",
        }),
        categoryID: z.string().min(1, {
            message: "Category is required.",
        }),
        manufacturerID: z.string(),
        model_number: z.string(),
        description: z.string()
    });
    //category
    async function fetchCategoryData(){
        try{ const response= await getCategory();
            return response.data;
        }
        catch(error)
        {throw error}

    }
    const [categories, setCategories]=useState([])
    const getCategoryList= async ()=> {
        const data=await fetchCategoryData();
        setCategories(data);
    }
    //manufacturer
    async function fetchManufacturerData(){
        try{ const response= await getManufacturer();
            return response.data;
        }
        catch(error)
        {throw error}

    }
    const [manufacturers, setManufacturers]=useState([])
    const getManufacturerList= async ()=>{
        const data= await fetchManufacturerData();
        setManufacturers(data);
    }

    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            categoryID:"",manufacturerID:"",model_number:"",description:""
        },
    });
    const onSubmit = async (values) => {
        try {
            await addModel(values.name,values.categoryID,values.manufacturerID,values.model_number,values.description);
            toast({
                description: "Model created successfully!",
                className: "bg-foreground text-white",
            });
            form.reset();

        } catch (error) {
            toast({
                variant: "destructive",
                description: "An error occurred while creating Model.",
            });
            console.error(error);
        }
    };


    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-[#1E7B56] text-white "><Plus />New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new Model</DialogTitle>
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
                                        name="categoryID"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center space-x-2">
                                                    <FormLabel className="w-1/4">Category <span
                                                        className="text-red-500 ml-1">*</span></FormLabel>
                                                    <Select  onValueChange={field.onChange} defaultValue={field.value}
                                                             onOpenChange={open => open && getCategoryList()}
                                                    >
                                                        <FormControl className="flex-1">
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a Category" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category.id} value={String(category.id)}>
                                                                    {category.name}
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
                                            name="manufacturerID"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormLabel className="w-1/4">Manufacturer</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}
                                                                onOpenChange={open => open && getManufacturerList()}
                                                        >
                                                            <FormControl className="flex-1">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a Manufacturer" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {manufacturers.map((manufacturer) => (
                                                                    <SelectItem key={manufacturer.id} value={String(manufacturer.id)}>
                                                                        {manufacturer.name}
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
                                    name="model_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">
                                                    Model Number
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">
                                                    Description
                                                </FormLabel>
                                                <FormControl className="flex-1">
                                                    <Textarea
                                                        placeholder=""
                                                        className="resize-none"
                                                        {...field}
                                                    />
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