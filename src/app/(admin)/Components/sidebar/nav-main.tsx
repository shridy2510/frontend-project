'use client'

import {
  BriefcaseBusiness,
  ChevronRight,
  CirclePlus, ClipboardMinus, Factory,
  FileChartColumn,
  Flag,
  Laptop,
  List,
  Settings2, Trash, Trash2, TvMinimal,
  UserRoundCheck, UserRoundMinus,
  UserRoundX
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {Badge} from "@/components/ui/badge";
import {useState} from "react";
export function NavMain() {

  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isAssetReportsOpen, setIsAssetReportsOpen] = useState(false);
  const [isStatusReportsOpen,setIsStatusReportsOpen]= useState(false);
  return (
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu >
          {/* Sidebar Menu Item 1: Alerts */}
          <Collapsible key="ok" defaultOpen={false} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Flag />
                  <span>Alerts</span>
                  <Badge className="ml-auto" variant="destructive">10</Badge>
                  <ChevronRight className=" transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem key="subtitle1">
                    <SidebarMenuSubButton>
                      <a href="/alerts/pastDue">
                        <span>Asset Past Due</span>


                      </a>
                      <Badge className="ml-auto" variant="destructive">1</Badge>

                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle2">
                    <SidebarMenuSubButton>
                      <a href="/alerts/underRepair">
                        <span>Under Repair</span>
                      </a>
                      <Badge className="ml-auto" variant="destructive">2</Badge>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle3">
                    <SidebarMenuSubButton>
                      <a href="/alerts/broken">
                        <span>Broken</span>
                      </a>
                      <Badge className="ml-auto" variant="destructive">3</Badge>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle4">
                    <SidebarMenuSubButton>
                      <a href="/alerts/lostOrMissing">
                        <span>Lost/Missing</span>

                      </a>
                      <Badge className="ml-auto" variant="destructive">4</Badge>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* Sidebar Menu Item 2: Assets */}
          <Collapsible key="ok1" defaultOpen={false} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Laptop />
                  <span>Assets</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem key="subtitle1">
                    <SidebarMenuSubButton>
                      <a href="/lists/AssetList" className="flex items-center gap-2">
                        <List size={16} />
                        <span>List of Assets</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle2">
                    <SidebarMenuSubButton>
                      <a href="/assets/createAsset" className="flex items-center gap-2">
                        <CirclePlus size={16} />
                        <span>Add an Asset</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle3">
                    <SidebarMenuSubButton>
                      <a href="/assets/checkOut" className="flex items-center gap-2">
                        <UserRoundCheck size={16} />
                        <span>Check out</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle4">
                    <SidebarMenuSubButton>
                      <a href="/assets/checkIn" className="flex items-center gap-2">
                        <UserRoundMinus size={16} />
                        <span>Check in</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle5">
                    <SidebarMenuSubButton>
                      <a href="/assets/dispose" className="flex items-center gap-2">
                        <Trash size={16} />
                        <span>Dispose</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* Sidebar Menu Item 3: Lists */}
          <Collapsible key="ok2" defaultOpen={false} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <List />
                  <span>Lists</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem key="subtitle1">
                    <SidebarMenuSubButton>
                      <a href="/lists/AssetList" className="flex items-center gap-2">
                        <span>List of Assets</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle2">
                    <SidebarMenuSubButton>
                      <a href="/lists/UserList" className="flex items-center gap-2">
                        <span>List of Users</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          {/* Sidebar Menu Item 4: Reports */}
          <Collapsible key="ok3" open={isReportsOpen} onOpenChange={() => setIsReportsOpen(!isReportsOpen)} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <FileChartColumn />
                  <span>Reports</span>
                  <ChevronRight
                      className={`ml-auto transition-transform duration-200 ${
                          isReportsOpen ? "rotate-90" : "rotate-0"
                      }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem key="subtitle1">
                    <Collapsible
                        key="assetReports"
                        open={isAssetReportsOpen}
                        onOpenChange={() => setIsAssetReportsOpen(!isAssetReportsOpen)}
                        className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton>
                          <span>Asset Reports</span>
                          <ChevronRight
                              className={`ml-auto transition-transform duration-200 ${
                                  isAssetReportsOpen ? "rotate-90" : "rotate-0"
                              }`}
                          />
                        </SidebarMenuSubButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem key="byCompany">
                            <SidebarMenuSubButton>
                              <a href="/report/assets/byCompany">
                                <span>By Company</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem key="byCategory">
                            <SidebarMenuSubButton>
                              <a href="/report/assets/byCategory">
                                <span>By Category</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem key="byTagId">
                            <SidebarMenuSubButton>
                              <a href="/report/assets/byTagId">
                                <span>By TagId</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuSubItem>



                  {/* Status Reports Section with Sub-items */}
                  <SidebarMenuSubItem key="subtitle3">
                    <Collapsible
                        key="statusReports"
                        open={isStatusReportsOpen}
                        onOpenChange={() => setIsStatusReportsOpen(!isStatusReportsOpen)}
                        className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton>
                          <span>Status Reports</span>
                          <ChevronRight
                              className={`ml-auto transition-transform duration-200 ${
                                  isStatusReportsOpen ? "rotate-90" : "rotate-0"
                              }`}
                          />
                        </SidebarMenuSubButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {/* Available Assets */}
                          <SidebarMenuSubItem key="availableAssets">
                            <SidebarMenuSubButton>
                              <a href="/report/status/available">
                                <span>Available Assets</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>

                          {/* Broken Assets */}
                          <SidebarMenuSubItem key="brokenAssets">
                            <SidebarMenuSubButton>
                              <a href="/report/status/broken">
                                <span>Broken Assets</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>

                          {/* Disposed Assets */}
                          <SidebarMenuSubItem key="disposedAssets">
                            <SidebarMenuSubButton>
                              <a href="/report/status/disposed">
                                <span>Disposed Assets</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>

                          {/* Lost/Missing Assets */}
                          <SidebarMenuSubItem key="lostMissingAssets">
                            <SidebarMenuSubButton>
                              <a href="/report/status/lostOrMissing">
                                <span>Lost/Missing Assets</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle2">
                    <SidebarMenuSubButton>
                      <a href="/report/checkOut">
                        <span>Check-Out Reports</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>



          {/* Sidebar Menu Item 5: Setup */}
          <Collapsible key="ok4" defaultOpen={false} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Settings2 />
                  <span>Setup</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem key="subtitle1">
                    <SidebarMenuSubButton>
                      <a href="/setup/company"  className="flex items-center gap-2">
                        <BriefcaseBusiness size={16} />
                        <span>Companies</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle2">
                    <SidebarMenuSubButton>
                      <a href="/setup/category" className="flex items-center gap-2">
                        <ClipboardMinus size={16} />
                        <span>Categories</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle3">
                    <SidebarMenuSubButton>
                      <a href="/setup/model" className="flex items-center gap-2">
                        <TvMinimal size={16} />
                        <span>Models</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem key="subtitle4">
                    <SidebarMenuSubButton>
                      <a href="/setup/manufacturer" className="flex items-center gap-2">
                        <Factory size={16} />
                        <span>Manufacturers</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
  )

}
