'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  AssetValueByStatusBarChart,
} from "@/app/(admin)/Components/charts/barChart/assetValueByStatus";
import {
  AssetValueByCategoryPieChart,
} from "@/app/(admin)/Components/charts/pieChart/assetValueByCategory";

export default function Dashboard() {
  return (
      <div className="content p-8">
    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
        <div className="ml-16 mr-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-stretch">
            {/* Card 1 */}
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Number of Active Assets</span>
                  <p className="text-3xl font-bold mt-2">1</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Total Assets</span>
                  <p className="text-3xl font-bold mt-2">150</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Value of Assets</span>
                  <p className="text-3xl font-bold mt-2">$5000</p>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium"> Recent Value of Assets</span>
                  <p className="text-3xl font-bold mt-2">$3000</p>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full flex flex-col justify-between">
              <CardContent>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium"> Total Users</span>
                  <p className="text-3xl font-bold mt-2">2</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <AssetValueByStatusBarChart/>
            <AssetValueByCategoryPieChart/>


          </div>



        </div>
      </div>

  )


}
