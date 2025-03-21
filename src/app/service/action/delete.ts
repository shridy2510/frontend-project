import axios from "@/axiosConfig";



export async function deleteAssett(id: string) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/Asset/delete?id=${id}`;
    return await axios.delete(url);
}
export async function deleteCategory(id: string) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/Category/delete?id=${id}`;
    return await axios.delete(url);
}

export async function deleteManufacturer(id: string) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/Manufacturer/delete?id=${id}`;
    return await axios.delete(url);
}

export async function deleteModdel(id: string) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/Model/delete?id=${id}`;
    return await axios.delete(url);
}
export async function deleteCompany(id: string) {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/Company/delete?id?=${id}`;
    return await axios.delete(url);
}
