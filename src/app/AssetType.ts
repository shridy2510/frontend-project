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

export type RequestedAsset = {
    id: number;
    assetTag: string;
    name: string;
    modelName: string;
    status: string;
    deniedTime: Date | null;
    assignedUserName: string;
    expectedCheckin: Date;
    expectedCheckout: Date ;
    actualCheckin: Date ;
    acceptTime: Date | null;
    requestDate: Date | null;
    adminName: string;
    location: string;
    assetId: number;
    userId: number;
};
