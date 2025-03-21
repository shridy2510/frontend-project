import {changeToUnderRepair} from "@/app/service/action/repair";
import {toast} from "@/hooks/use-toast";
import {changeToDisposed} from "@/app/service/action/dispose";
import {changeToLostMissing} from "@/app/service/action/lostMiss";
import {changeToAvailable} from "@/app/service/action/available";
import {changeToBroken} from "@/app/service/action/broken";
import {changeToCheckedOut} from "@/app/service/action/checkout";
import {
    deleteAssett,
    deleteCategory,
    deleteCompany,
    deleteManufacturer,
    deleteModdel
} from "@/app/service/action/delete";
import {changeToAFromCheckIn} from "@/app/service/action/checkin";

export async function repair(id:string){
    try {
        await changeToUnderRepair(id) ;
        toast({
            description: "Asset Status change to Under Repair",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function dispose(id:string){
    try {
        await changeToDisposed(id) ;
        toast({
            description: "Asset Status change to Disposed",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function lostMissing(id:string){
    try {
        await changeToLostMissing(id) ;
        toast({
            description: "Asset Status change to Lost / Missing",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function makeAvailable(id:string){
    try {
        await changeToAvailable(id) ;
        toast({
            description: "Asset Status change to Available",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function broken(id:string){
    try {
        await changeToBroken(id) ;
        toast({
            description: "Asset Status change to Brokenr",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }
}
export async function deleteAsset(id:string){
    try {
        await deleteAssett(id) ;
        toast({
            description: "Asset deleted",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function checkOut(id, userId,lastCheckout:Date,expectedCheckin:Date){
    try {
        await changeToCheckedOut(id,userId,lastCheckout,expectedCheckin) ;
        toast({
            description: "Asset Status change to Checked Out",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function checkIn(id:string){
    try {
        await changeToAFromCheckIn(id) ;
        toast({
            description: "Asset Status change to Available",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}

export async function deleteManufacturers(id:string){
    try {
        await deleteManufacturer(id) ;
        toast({
            description: "Manufacturer deleted",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function deleteCategories(id:string){
    try {
        await deleteCategory(id) ;
        toast({
            description: "Category deleted",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function deleteModels(id:string){
    try {
        await deleteModdel(id) ;
        toast({
            description: "Model deleted",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}
export async function deleteCompanies(id:string){
    try {
        await deleteCompany(id) ;
        toast({
            description: "Model deleted",
            className: "bg-foreground text-white",
        });

    } catch (error) {
        toast({
            variant: "destructive",
            description: "An error occurred",
        });

    }

}