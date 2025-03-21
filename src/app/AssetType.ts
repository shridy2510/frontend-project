export type Asset = {
    id: string,
    assetTag: string,
    serial: string,
    name: string,
    status: string,
    modelName: string,
    companyName: string,
    cost:number
}
export type Category={
    id: string,
    name: string,
    type: string
}
export type Company={
    id: string,
    name:string,
    address: string
}
export type Manufacturer={
    id : string,
    name: string,
    url: string

}
export type Model={
    id:string,
    name:string,
    model_number:string,
    description: string,
    manufacturerName: string,
    categoryName:string

}