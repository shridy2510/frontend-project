
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import {CalendarIcon, UserRoundCheck} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "@/components/ui/calendar"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {getCategory} from "@/app/service/categoryService/functions";
import {getManufacturer} from "@/app/service/manufacturerService/functions";
import {useState} from "react";
import {addModel} from "@/app/service/modelService/getList";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast, useToast} from "@/hooks/use-toast";
import {getUsers} from "@/app/service/userService/countAndValue";
import {checkOut} from "@/app/service/action/functions/actionFunction";



export default function CheckOutModal({id}){


    const formSchema = z.object({
        checkOutDate: z.date({
            required_error: "Check-out Date is required.",
        }),
        checkInDate: z.date({
            required_error: "Expected Check-in Date is required.",
        }),
        user: z.string().min(1,{
            message: "User is required.",
        }),
        location: z.string()
    });
    //users
    async function fetchUsersData(){
        try{ const response= await getUsers();
            return response.data;
        }
        catch(error){return null
       }

    }
    const [users, setUsers]=useState([])
    const getUsersList= async ()=> {
        const data=await fetchUsersData();
        setUsers(data);
    }



    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            checkOutDate: "",
            checkInDate:"",user:"",location:""
        },
    });
    const onSubmit = async (values) => {
        try {await checkOut(id,Number(values.user),values.checkOutDate,values.checkInDate,location)

            form.reset();
            setOpenDialog(false)
            toast({
                description: "Asset CheckOut successfully!",
                className: "bg-foreground text-white",
            });

        } catch (error) {
            setOpenDialog(false)
            console.error(error);
            toast({
                variant: "destructive",
                description: "An error occurred",
            });
        }
    };
    const [openDialog, setOpenDialog] = useState(false);
    const [openPopUp,setOpenPopUp]=useState(false);
    const [openPopUp1,setOpenPopUp1]=useState(false);

    return(
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                  <span onClick={()=>setOpenDialog(true)}><UserRoundCheck className="inline-block mr-2"/>
                                    Check Out</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>Check out</DialogTitle>
                    <DialogDescription>
                        Enter the data in the fields below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex-1 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="checkOutDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">
                                                    Check-out Date <span className="text-red-500 ml-1">*</span>
                                                </FormLabel>
                                                <Popover  modal={true} open={openPopUp} onOpenChange={setOpenPopUp}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                onClick={()=>setOpenPopUp(true)}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onDayClick={(date) => {
                                                                // Update the form field
                                                                field.onChange(date);
                                                                // Change additional state, for example, closing a modal/popover:
                                                                setOpenPopUp(false);
                                                            }}

                                                            disabled={(date) =>
                                                               date < new Date("1900-01-01")

                                                            }
                                                            initialFocus={true}



                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <FormMessage  />
                                        </FormItem>
                                    )}
                                />



                                <FormField
                                    control={form.control}
                                    name="user"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">Assign to <span
                                                    className="text-red-500 ml-1">*</span></FormLabel>
                                                <Select  onValueChange={field.onChange} defaultValue={field.value}
                                                         onOpenChange={open => open && getUsersList()}>
                                                    <FormControl className="flex-1">
                                                        <SelectTrigger  >
                                                            <SelectValue placeholder="Select Username" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {users.map((user) => (
                                                            <SelectItem key={user.id} value={String(user.id)}>
                                                                {user.userName}
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

                                <FormField
                                    control={form.control}
                                    name="checkInDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-1/4">Due Date <span
                                                    className="text-red-500 ml-1">*</span></FormLabel>
                                                <Popover  modal={true} open={openPopUp1} onOpenChange={setOpenPopUp1}>
                                                <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                onClick={()=>setOpenPopUp1(true)}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onDayClick={(date) => {
                                                                // Update the form field
                                                                field.onChange(date);
                                                                // Change additional state, for example, closing a modal/popover:
                                                                setOpenPopUp1(false);
                                                            }}
                                                            disabled={(date) =>
                                                               date < new Date("1900-01-01")
                                                            }
                                                            initialFocus={true}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
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