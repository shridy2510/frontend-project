'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  AssetValueByStatusBarChart,
} from "@/app/(admin)/Components/charts/barChart/assetValueByStatus";
import {
  AssetTotalByStatusPieChart,
} from "@/app/(admin)/Components/charts/pieChart/assetTotalByStatus";
import {useEffect, useState} from "react";
import {
  getAssetCost,
  getTotalAsset,
  getTotalAvailableAsset
} from "@/app/service/AssetService/countAndValue";
import {getTotalUser} from "@/app/service/userService/countAndValue";

export default function Dashboard() {
  const [totalAAssets,setTotalAAssets]=useState(0);
  const [totalAssets,setTotalAssets]=useState(0);
  const [totalUsers,setTotalUsers]=useState(0);
  const [totalCosts,setTotalCosts]=useState(0);
  useEffect(()=>{
    async function getTotalAAssetData(){
      try{
      const response=await getTotalAvailableAsset();
      setTotalAAssets(response.data)}
      catch(error){setTotalAAssets(0);
        console.error("error:",error);
      }

    }
    async function getTotalAssetData(){
      try{
        const response=await getTotalAsset();
        setTotalAssets(response.data)}
      catch(error){setTotalAssets(0);
        console.error("error:",error);
      }

    }
    async function getTotalUserData(){
      try{
        const response=await getTotalUser();
        setTotalUsers(response.data)}
      catch(error){setTotalUsers(0);
        console.error("error:",error);
      }
    }
    async function getAssetCostData(){
      try{
        const response=await getAssetCost();
        setTotalCosts(response.data)}
      catch(error){setTotalCosts(0);
        console.error("error:",error);
      }
    }
    getTotalAAssetData();
    getTotalAssetData();
    getTotalUserData();
    getAssetCostData();








  },[])
  return (
      <div className="content p-8">
    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
        <div className="ml-16 mr-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-stretch">
            {/* Card 1 */}
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Number of Available Assets</span>
                  <p className="text-3xl font-bold mt-2">{totalAAssets}</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Total Assets</span>
                  <p className="text-3xl font-bold mt-2">{totalAssets}</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Value of Assets</span>
                  <p className="text-3xl font-bold mt-2">
                    {totalCosts.toLocaleString("vi-VN")} VND
                  </p>

                </div>
              </CardContent>
            </Card>
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium"> Total Users</span>
                  <p className="text-3xl font-bold mt-2">{totalUsers}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <AssetValueByStatusBarChart/>
            <AssetTotalByStatusPieChart/>


          </div>



        </div>
      </div>

  )


}
